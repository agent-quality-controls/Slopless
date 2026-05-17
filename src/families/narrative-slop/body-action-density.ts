import type { TxtDocumentNode } from "@textlint/ast-node-types";
import type { TextlintRuleModule } from "@textlint/types";
import { allParagraphs } from "../../shared/text/sections.js";
import { splitSentences } from "../../shared/text/sentences.js";
import { type Token, wordTokens } from "../../shared/text/tokens.js";

const MOVEMENT_CUES = new Set([
  "step",
  "steps",
  "stepped",
  "stepping",
  "walk",
  "walks",
  "walked",
  "walking",
  "stand",
  "stands",
  "stood",
  "standing",
  "sit",
  "sits",
  "sat",
  "sitting",
  "turn",
  "turns",
  "turned",
  "turning",
  "cross",
  "crosses",
  "crossed",
  "crossing",
  "climb",
  "climbs",
  "climbed",
  "climbing",
  "crouch",
  "crouches",
  "crouched",
  "crouching",
  "stop",
  "stops",
  "stopped",
  "stopping",
  "wait",
  "waits",
  "waited",
  "waiting",
  "pull",
  "pulls",
  "pulled",
  "pulling",
  "pick",
  "picks",
  "picked",
  "picking",
  "flatten",
  "flattens",
  "flattened",
  "flattening",
  "flick",
  "flicks",
  "flicked",
  "flicking"
]);

const BODY_CUES = new Set([
  "ear",
  "ears",
  "tail",
  "tails",
  "chest",
  "chests",
  "stomach",
  "stomachs",
  "heart",
  "hearts",
  "breath",
  "breaths",
  "paw",
  "paws"
]);

const MAX_PARAGRAPH_TOKENS = 95;
const MAX_WINDOW_TOKENS = 60;
const MIN_GROUP_HITS = 3;
const WINDOW_SENTENCES = 4;

type CueGroup = "body cue" | "movement cue";
type PhraseCue = {
  readonly group: CueGroup;
  readonly tokens: readonly string[];
};

type DenseMatch = {
  readonly count: number;
  readonly end: number;
  readonly group: CueGroup;
  readonly start: number;
  readonly words: readonly string[];
};

const PHRASE_CUES: readonly PhraseCue[] = [
  { group: "movement cue", tokens: ["crossed", "her", "arms"] },
  { group: "movement cue", tokens: ["crossed", "his", "arms"] },
  { group: "movement cue", tokens: ["crossed", "their", "arms"] },
  { group: "movement cue", tokens: ["sat", "up"] },
  { group: "movement cue", tokens: ["walked", "over"] },
  { group: "movement cue", tokens: ["stopped", "next", "to"] },
  { group: "movement cue", tokens: ["looked", "up", "at"] },
  { group: "movement cue", tokens: ["rested", "her", "paws"] },
  { group: "movement cue", tokens: ["rested", "his", "paws"] },
  { group: "movement cue", tokens: ["rested", "their", "paws"] },
  { group: "body cue", tokens: ["looked", "tired"] },
  { group: "body cue", tokens: ["ears", "twitched"] },
  { group: "body cue", tokens: ["ears", "flattened"] },
  { group: "body cue", tokens: ["tail", "angled"] },
  { group: "body cue", tokens: ["tail", "flicked"] },
  { group: "body cue", tokens: ["paws", "shifted"] },
  { group: "body cue", tokens: ["paws", "trembled"] }
];

type CueHit = {
  readonly end: number;
  readonly group: CueGroup;
  readonly start: number;
  readonly word: string;
};

function markCovered(
  covered: Set<number>,
  start: number,
  length: number
): void {
  for (let offset = 0; offset < length; offset += 1) {
    covered.add(start + offset);
  }
}

function cueGroup(token: Token): CueGroup | undefined {
  if (MOVEMENT_CUES.has(token.normalized)) {
    return "movement cue";
  }

  if (BODY_CUES.has(token.normalized)) {
    return "body cue";
  }

  return undefined;
}

function tokensMatchAt(
  tokens: readonly Token[],
  expected: readonly string[],
  start: number
): boolean {
  if (start + expected.length > tokens.length) {
    return false;
  }

  return expected.every(
    (word, index) => tokens[start + index]?.normalized === word
  );
}

function cueHits(tokens: readonly Token[]): CueHit[] {
  const hits: CueHit[] = [];
  const phraseCovered = new Set<number>();

  for (let index = 0; index < tokens.length; index += 1) {
    const token = tokens[index];
    if (token === undefined) {
      continue;
    }

    for (const phrase of PHRASE_CUES) {
      if (!tokensMatchAt(tokens, phrase.tokens, index)) {
        continue;
      }

      const last = tokens[index + phrase.tokens.length - 1];
      if (last === undefined) {
        continue;
      }

      hits.push({
        end: last.end,
        group: phrase.group,
        start: token.start,
        word: phrase.tokens.join(" ")
      });
      markCovered(phraseCovered, index, phrase.tokens.length);
    }
  }

  for (let index = 0; index < tokens.length; index += 1) {
    const token = tokens[index];
    if (token === undefined || phraseCovered.has(index)) {
      continue;
    }

    const group = cueGroup(token);
    if (group !== undefined) {
      hits.push({
        end: token.end,
        group,
        start: token.start,
        word: token.normalized
      });
    }
  }

  return hits.sort((left, right) => left.start - right.start);
}

function denseMatchForSpan(
  text: string,
  start: number,
  end: number
): DenseMatch | undefined {
  const byGroup = new Map<CueGroup, CueHit[]>();

  for (const hit of cueHits(wordTokens(text.slice(start, end)))) {
    byGroup.set(hit.group, [...(byGroup.get(hit.group) ?? []), hit]);
  }

  for (const group of ["movement cue", "body cue"] as const) {
    const hits = byGroup.get(group) ?? [];
    if (hits.length < MIN_GROUP_HITS) {
      continue;
    }

    const first = hits[0];
    const last = hits.at(-1);
    if (first === undefined || last === undefined) {
      continue;
    }

    return {
      count: hits.length,
      end: start + last.end,
      group,
      start: start + first.start,
      words: [...new Set(hits.map((hit) => hit.word))]
    };
  }

  return undefined;
}

function firstDenseMatch(text: string): DenseMatch | undefined {
  if (wordTokens(text).length <= MAX_PARAGRAPH_TOKENS) {
    const paragraphMatch = denseMatchForSpan(text, 0, text.length);
    if (paragraphMatch !== undefined) {
      return paragraphMatch;
    }
  }

  const sentences = splitSentences(text);
  for (let index = 0; index < sentences.length; index += 1) {
    const window = sentences.slice(index, index + WINDOW_SENTENCES);
    if (window.length < 2) {
      continue;
    }

    const first = window[0];
    const last = window.at(-1);
    if (first === undefined || last === undefined) {
      continue;
    }

    if (
      wordTokens(text.slice(first.start, last.end)).length > MAX_WINDOW_TOKENS
    ) {
      continue;
    }

    const windowMatch = denseMatchForSpan(text, first.start, last.end);
    if (windowMatch !== undefined) {
      return windowMatch;
    }
  }

  return undefined;
}

const rule: TextlintRuleModule = (context) => {
  const { Syntax, RuleError, locator, report } = context;

  return {
    [Syntax.Document](node: TxtDocumentNode): void {
      for (const item of allParagraphs(node)) {
        const match = firstDenseMatch(item.text);
        if (match === undefined) {
          continue;
        }

        report(
          item.paragraph,
          new RuleError(
            `Body-action density: ${match.count} ${match.group}s in a short span (${match.words.join(", ")}).`,
            {
              padding: locator.range([
                item.source.originalStartFor(match.start),
                item.source.originalEndFor(match.end)
              ])
            }
          )
        );
      }
    }
  };
};

export default rule;
