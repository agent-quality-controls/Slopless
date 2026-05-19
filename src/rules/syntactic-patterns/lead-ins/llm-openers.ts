import { tokens } from "../../../shared/matchers/prose-patterns.js";
import { oneToOneRule } from "../../private/textlint-rule-builders.js";

const OPENERS = [
  "the interesting part is",
  "in the ever-evolving landscape",
  "in the realm of",
  "in the world of",
  "in today's digital age",
  "in today's fast-paced world"
];
const FORMULAIC_OPENERS = [
  ["i used to ", " like a normal person"],
  ["i used to ", " like a technical person"]
] as const;
const FIRST_PERSON_REVERSAL_VERBS = [
  "assume",
  "believe",
  "call",
  "explain",
  "look",
  "read",
  "see",
  "talk",
  "think",
  "treat",
  "write"
];
const REVERSAL_MARKERS = ["actually", "but", "now", "then", "until", "wrong"];

function matchFirstPersonReversal(lower: string): string | undefined {
  if (!lower.startsWith("i used to ")) {
    return undefined;
  }

  const words = tokens(lower);
  const verb = words[3];
  if (
    verb === undefined ||
    !FIRST_PERSON_REVERSAL_VERBS.includes(verb) ||
    !REVERSAL_MARKERS.some((marker) => words.includes(marker))
  ) {
    return undefined;
  }

  return `i-used-to-${verb}`;
}

const rule = oneToOneRule({
  detect: (unit) => {
    const lower = unit.text.toLocaleLowerCase("en");
    const opener = OPENERS.find((phrase) => lower.startsWith(phrase));
    const formulaicOpener = FORMULAIC_OPENERS.find(
      ([start, marker]) => lower.startsWith(start) && lower.includes(marker)
    );
    const signal =
      opener ?? formulaicOpener?.join("...") ?? matchFirstPersonReversal(lower);

    if (signal === undefined) {
      return [];
    }
    return [
      {
        evidence: signal,
        label: signal,
        range: { start: 0, end: unit.text.length }
      }
    ];
  },
  family: "syntactic-patterns",
  formatMessage: (report) =>
    `LLM opener found: "${report.evidence}". Start with the concrete claim instead.`,
  ruleId: "syntactic-patterns:llm-openers",
  unitKind: "section-first-sentence"
});

export default rule;
