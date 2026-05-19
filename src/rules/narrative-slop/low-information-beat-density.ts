import { defineTextlintRule } from "../../adapters/textlint/rule.js";
import { paragraphUnits } from "../../adapters/textlint/units.js";
import { type Token, wordTokens } from "../../shared/text/tokens.js";
import type { RuleDetection, RuleId, TextUnit } from "../types.js";

const RULE_ID = "narrative-slop:low-information-beat-density" satisfies RuleId;
const GROUP = "low-information beat";
const MAX_PARAGRAPH_TOKENS = 95;
const MAX_WINDOW_TOKENS = 65;
const MIN_HITS = 5;
const WINDOW_SENTENCES = 5;

const LOW_INFORMATION_WORDS = new Set([
  "blinked",
  "breath",
  "chest",
  "eyes",
  "face",
  "felt",
  "found",
  "glanced",
  "heart",
  "looked",
  "shoulders",
  "stepped",
  "stomach",
  "throat",
  "tightened",
  "turned",
  "waited"
]);

const CONCRETE_ACTION_WORDS = new Set([
  "arrow",
  "copied",
  "count",
  "counted",
  "gate",
  "guards",
  "symbol"
]);

type BeatGroup = typeof GROUP;

function hasConcreteAction(tokens: readonly Token[]): boolean {
  return tokens.some((token) => CONCRETE_ACTION_WORDS.has(token.normalized));
}

function beatDetections(unit: TextUnit): RuleDetection<BeatGroup>[] {
  const tokens = wordTokens(unit.text);
  if (hasConcreteAction(tokens)) {
    return [];
  }

  return tokens
    .filter((token) => LOW_INFORMATION_WORDS.has(token.normalized))
    .map((token) => ({
      evidence: unit.text.slice(token.start, token.end),
      group: GROUP,
      label: token.normalized,
      range: { end: token.end, start: token.start },
      ruleId: RULE_ID,
      unitId: unit.id
    }));
}

const rule = defineTextlintRule({
  detector: {
    detect: ({ units }) => units.flatMap((unit) => beatDetections(unit)),
    family: "narrative-slop",
    id: RULE_ID
  },
  formatMessage: (report) => {
    const labels = [...new Set(report.detections.map((hit) => hit.label))];
    return `Low-information beat density: ${report.detections.length} weak body/action beats in a short span (${labels.join(", ")}).`;
  },
  reportPolicy: {
    groups: [GROUP],
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
