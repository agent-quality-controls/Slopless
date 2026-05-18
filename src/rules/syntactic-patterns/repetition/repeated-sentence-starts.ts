import { defineTextlintRule } from "../../../adapters/textlint/rule.js";
import { paragraphUnits } from "../../../adapters/textlint/units.js";
import { splitSentences } from "../../../shared/text/sentences.js";
import { wordTokens } from "../../../shared/text/tokens.js";
import type { RuleDetection, RuleId, TextUnit } from "../../types.js";

const RULE_ID = "syntactic-patterns:repeated-sentence-starts" satisfies RuleId;
const MAX_PARAGRAPH_TOKENS = 120;
const MAX_WINDOW_TOKENS = 70;
const MIN_HITS = 3;
const WINDOW_SENTENCES = 5;
const FRAME_TOKEN_COUNT = 2;
const EXTRA_FRAME_VERBS = new Set(["are", "is", "was", "were"]);

type StartFrame = {
  readonly end: number;
  readonly label: string;
  readonly start: number;
};

function sentenceStartFrame(text: string): StartFrame | undefined {
  const tokens = wordTokens(text);
  const first = tokens[0];
  const second = tokens[1];
  if (first === undefined || second === undefined) {
    return undefined;
  }

  const third = tokens[2];
  const frameLength =
    third !== undefined && EXTRA_FRAME_VERBS.has(third.normalized) ? 3 : 2;
  const last = tokens[frameLength - 1];
  if (last === undefined) {
    return undefined;
  }

  return {
    end: last.end,
    label: tokens
      .slice(0, Math.max(FRAME_TOKEN_COUNT, frameLength))
      .map((token) => token.normalized)
      .join(" "),
    start: first.start
  };
}

function repeatedLabels(frames: readonly StartFrame[]): ReadonlySet<string> {
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

function startDetections(
  unit: TextUnit
): RuleDetection<"repeated sentence start">[] {
  const sentences = splitSentences(unit.text);
  const frames = sentences.map((sentence) => ({
    frame: sentenceStartFrame(sentence.text),
    sentence
  }));
  const labels = repeatedLabels(
    frames.flatMap((item) => (item.frame === undefined ? [] : [item.frame]))
  );

  return frames.flatMap(({ frame, sentence }) => {
    if (frame === undefined || !labels.has(frame.label)) {
      return [];
    }

    return [
      {
        evidence: unit.text.slice(
          sentence.start + frame.start,
          sentence.start + frame.end
        ),
        group: "repeated sentence start",
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
    detect: ({ units }) => units.flatMap((unit) => startDetections(unit)),
    family: "syntactic-patterns",
    id: RULE_ID
  },
  formatMessage: (report) => {
    const labels = [...new Set(report.detections.map((hit) => hit.label))];
    return `Repeated sentence starts: ${report.detections.length} nearby sentences start with the same frame (${labels.join(", ")}).`;
  },
  reportPolicy: {
    groups: ["repeated sentence start"],
    kind: "density",
    maxParagraphTokens: MAX_PARAGRAPH_TOKENS,
    maxWindowTokens: MAX_WINDOW_TOKENS,
    paragraphMinimumHits: MIN_HITS,
    windowMinimumHits: MIN_HITS,
    windowSentences: WINDOW_SENTENCES
  },
  units: (document) => paragraphUnits(document)
});

export default rule;
