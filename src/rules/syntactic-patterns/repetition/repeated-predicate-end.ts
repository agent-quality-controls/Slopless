import { defineTextlintRule } from "../../../adapters/textlint/rule.js";
import { paragraphSequenceUnit } from "../../../adapters/textlint/units.js";
import { hasConcreteInventorySubjects } from "../../../shared/matchers/concrete-evidence.js";
import { splitSentences } from "../../../shared/text/sentences.js";
import { wordTokens, type Token } from "../../../shared/text/tokens.js";
import type { RuleDetection, RuleId, TextUnit } from "../../types.js";

const RULE_ID = "syntactic-patterns:repeated-predicate-end" satisfies RuleId;
const MAX_WINDOW_TOKENS = 90;
const MIN_HITS = 3;
const WINDOW_SENTENCES = 7;

const ENDING_FRAMES = [
  ["can", "help"],
  ["can", "matter"],
  ["can", "work"],
  ["changes"],
  ["does", "the", "work"],
  ["gets", "worse"],
  ["is", "enough"],
  ["is", "the", "job"],
  ["is", "the", "point"],
  ["is", "useful"],
  ["matters"],
  ["helps"],
  ["still", "matters"],
  ["works"]
] as const;

type EndingFrame = {
  readonly end: number;
  readonly label: string;
  readonly start: number;
};

function tokensMatchEnding(
  tokens: readonly Token[],
  frame: readonly string[]
): boolean {
  if (tokens.length < frame.length) {
    return false;
  }

  const start = tokens.length - frame.length;
  return frame.every(
    (word, index) => tokens[start + index]?.normalized === word
  );
}

function sentenceEndingFrame(text: string): EndingFrame | undefined {
  const tokens = wordTokens(text);
  const frame = ENDING_FRAMES.find((candidate) =>
    tokensMatchEnding(tokens, candidate)
  );
  if (frame === undefined) {
    return undefined;
  }

  const startToken = tokens[tokens.length - frame.length];
  const endToken = tokens.at(-1);
  if (startToken === undefined || endToken === undefined) {
    return undefined;
  }

  return {
    end: endToken.end,
    label: frame.join(" "),
    start: startToken.start
  };
}

function repeatedEndingLabels(
  frames: readonly EndingFrame[]
): ReadonlySet<string> {
  const counts = new Map<string, number>();
  for (const frame of frames) {
    counts.set(frame.label, (counts.get(frame.label) ?? 0) + 1);
  }

  return new Set(
    [...counts.entries()]
      .filter(([, count]) => count >= MIN_HITS)
      .map(([label]) => label)
  );
}

function endingDetections(
  unit: TextUnit
): RuleDetection<"repeated predicate end">[] {
  const sentences = splitSentences(unit.text);
  const sentenceFrames = sentences.map((sentence) => ({
    frame: sentenceEndingFrame(sentence.text),
    sentence
  }));
  const repeatedLabels = repeatedEndingLabels(
    sentenceFrames.flatMap((item) =>
      item.frame === undefined ? [] : [item.frame]
    )
  );
  const concreteInventoryLabels = new Set(
    [...repeatedLabels].filter((label) =>
      hasConcreteInventorySubjects(
        sentenceFrames.flatMap((item) =>
          item.frame?.label === label ? [item.sentence.text] : []
        )
      )
    )
  );

  return sentenceFrames.flatMap(({ frame, sentence }) => {
    if (
      frame === undefined ||
      !repeatedLabels.has(frame.label) ||
      concreteInventoryLabels.has(frame.label)
    ) {
      return [];
    }

    return [
      {
        evidence: unit.text.slice(
          sentence.start + frame.start,
          sentence.start + frame.end
        ),
        group: "repeated predicate end",
        label: frame.label,
        range: {
          end: sentence.start + frame.end,
          start: sentence.start + frame.start
        },
        ruleId: RULE_ID,
        unitId: unit.id
      }
    ];
  });
}

const rule = defineTextlintRule({
  detector: {
    detect: ({ units }) => units.flatMap((unit) => endingDetections(unit)),
    family: "syntactic-patterns",
    id: RULE_ID
  },
  formatMessage: (report) => {
    const labels = [...new Set(report.detections.map((hit) => hit.label))];
    return `Repeated sentence endings: ${report.detections.length} nearby sentences end with the same weak predicate (${labels.join(", ")}).`;
  },
  reportPolicy: {
    groups: ["repeated predicate end"],
    kind: "density",
    maxParagraphTokens: MAX_WINDOW_TOKENS,
    maxWindowTokens: MAX_WINDOW_TOKENS,
    paragraphMinimumHits: MIN_HITS,
    windowMinimumHits: MIN_HITS,
    windowSentences: WINDOW_SENTENCES
  },
  units: (document) => [paragraphSequenceUnit(document)]
});

export default rule;
