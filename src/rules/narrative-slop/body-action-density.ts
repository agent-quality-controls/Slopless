import type { TxtDocumentNode } from "@textlint/ast-node-types";
import type { TextlintRuleModule } from "@textlint/types";
import { firstDensityMatch } from "../../reporting/report-density.js";
import type { Detection } from "../../reporting/types.js";
import { allParagraphs } from "../../shared/text/sections.js";
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
  { group: "body cue", tokens: ["took", "a", "deep", "breath"] },
  { group: "body cue", tokens: ["let", "out", "a", "breath"] },
  { group: "body cue", tokens: ["voice", "was", "low"] },
  { group: "body cue", tokens: ["smile", "played", "on", "her", "lips"] },
  { group: "body cue", tokens: ["smile", "played", "on", "his", "lips"] },
  { group: "body cue", tokens: ["smile", "played", "on", "their", "lips"] },
  { group: "body cue", tokens: ["looked", "tired"] },
  { group: "body cue", tokens: ["ears", "twitched"] },
  { group: "body cue", tokens: ["ears", "flattened"] },
  { group: "body cue", tokens: ["tail", "angled"] },
  { group: "body cue", tokens: ["tail", "flicked"] },
  { group: "body cue", tokens: ["paws", "shifted"] },
  { group: "body cue", tokens: ["paws", "trembled"] }
];

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

function cueDetections(text: string): Detection<CueGroup>[] {
  const tokens = wordTokens(text);
  const detections: Detection<CueGroup>[] = [];
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

      detections.push({
        end: last.end,
        group: phrase.group,
        label: phrase.tokens.join(" "),
        start: token.start
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
      detections.push({
        end: token.end,
        group,
        label: token.normalized,
        start: token.start
      });
    }
  }

  return detections.sort((left, right) => left.start - right.start);
}

const rule: TextlintRuleModule = (context) => {
  const { Syntax, RuleError, locator, report } = context;

  return {
    [Syntax.Document](node: TxtDocumentNode): void {
      for (const item of allParagraphs(node)) {
        const match = firstDensityMatch(item.text, {
          detect: cueDetections,
          groups: ["movement cue", "body cue"],
          maxParagraphTokens: MAX_PARAGRAPH_TOKENS,
          maxWindowTokens: MAX_WINDOW_TOKENS,
          paragraphMinimumHits: MIN_GROUP_HITS,
          windowMinimumHits: MIN_GROUP_HITS,
          windowSentences: WINDOW_SENTENCES
        });
        if (match === undefined) {
          continue;
        }

        report(
          item.paragraph,
          new RuleError(
            `Body-action density: ${match.count} ${match.group}s in a short span (${match.labels.join(", ")}).`,
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
