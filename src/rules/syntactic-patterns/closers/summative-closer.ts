import { oneToOneRule } from "../../private/textlint-rule-builders.js";

const SUMMATIVE_PATTERNS = [
  "and that's what makes",
  "all in all",
  "in conclusion",
  "in summary",
  "that's why this",
  "that's the reason",
  "that's why it works",
  "that is why it works",
  "that's why it matters",
  "that is why it matters",
  "that's why this matters",
  "that is why this matters",
  "that is what makes",
  "this is what makes",
  "that is what makes the",
  "this is what makes the",
  "this is why it works",
  "that is why it works",
  "that is the reason",
  "this is the reason",
  "this is why it matters",
  "this is why this matters",
  "the bottom line is",
  "the key takeaway is",
  "the lesson is",
  "the main takeaway is",
  "the point is",
  "the practical takeaway is",
  "the practical takeaway is clear",
  "the real lesson is",
  "the takeaway is",
  "to sum up",
  "to summarize"
];
const CONCRETE_MARKERS = [
  ":",
  "because",
  "by ",
  "from ",
  "after ",
  "before ",
  "when ",
  "if ",
  "with ",
  "without "
];

function hasDigit(text: string): boolean {
  for (const character of text) {
    if (character >= "0" && character <= "9") {
      return true;
    }
  }

  return false;
}

function hasConcreteMarker(text: string): boolean {
  return (
    hasDigit(text) || CONCRETE_MARKERS.some((marker) => text.includes(marker))
  );
}

const rule = oneToOneRule({
  detect: (unit) => {
    const lower = unit.text.toLocaleLowerCase("en");
    const pattern = SUMMATIVE_PATTERNS.find((phrase) =>
      lower.startsWith(phrase)
    );
    if (pattern === undefined || hasConcreteMarker(lower)) {
      return [];
    }

    return [
      {
        evidence: pattern,
        label: pattern,
        range: { start: 0, end: unit.text.length }
      }
    ];
  },
  family: "syntactic-patterns",
  formatMessage: (report) =>
    `Summative frame found: "${report.evidence}". State the concrete point instead.`,
  ruleId: "syntactic-patterns:summative-closer",
  unitKind: "sentence"
});

export default rule;
