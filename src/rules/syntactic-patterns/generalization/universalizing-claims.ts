import {
  cleanSentence,
  tokens,
  startsWithWords
} from "../../../shared/matchers/prose-patterns.js";
import { oneToOneRule } from "../../private/textlint-rule-builders.js";

const PREFIXES = [
  "however, ",
  "but ",
  "and ",
  "so ",
  "ultimately, ",
  "after all, ",
  "in the end, "
];
const SUBJECT_PATTERNS = [
  ["everyone"],
  ["everybody"],
  ["we", "all"],
  ["many", "adults"],
  ["many", "couples"],
  ["many", "families"],
  ["many", "kids"],
  ["many", "parents"],
  ["many", "people"],
  ["many", "of", "us"],
  ["most", "adults"],
  ["most", "couples"],
  ["most", "people"],
  ["most", "of", "us"],
  ["most", "parents"],
  ["most", "families"],
  ["most", "kids"],
  ["for", "many", "adults"],
  ["for", "many", "families"],
  ["for", "many", "parents"],
  ["for", "many", "people"],
  ["for", "most", "people"],
  ["no", "one"],
  ["nobody"]
] as const;
const DESIRE_VERBS = [
  "want",
  "wants",
  "hope",
  "hopes",
  "deserve",
  "deserves",
  "crave",
  "craves",
  "look",
  "looks",
  "reach",
  "reaches",
  "try",
  "tries"
];
const CERTAINTY_VERBS = [
  "assume",
  "assumes",
  "expect",
  "expects",
  "know",
  "knows"
];
const HUMAN_GROUP_SUBJECTS = [
  "adults",
  "children",
  "couples",
  "dads",
  "families",
  "kids",
  "moms",
  "parents",
  "people",
  "students",
  "teachers"
];
const GROUP_BEHAVIOR_GERUNDS = [
  "asking",
  "looking",
  "reaching",
  "trying",
  "waiting",
  "hoping",
  "wondering"
];
const BROAD_GROUP_LEADS = ["many", "most"];
const VAGUE_QUANTIFIERS = ["a lot of", "many", "several", "some", "various"];
const ABSTRACT_NOUNS = [
  "areas",
  "aspects",
  "benefits",
  "challenges",
  "changes",
  "concerns",
  "factors",
  "impacts",
  "issues",
  "outcomes",
  "reasons",
  "results",
  "stakeholders",
  "themes",
  "things"
];
const ABSTRACT_MODIFIERS = [
  "important",
  "key",
  "major",
  "meaningful",
  "notable",
  "significant",
  "various"
];
const EVIDENCE_MARKERS = [
  "for example",
  "including",
  "such as",
  "because",
  "from ",
  "after ",
  "before ",
  "when "
];

function hasDigit(text: string): boolean {
  for (const character of text) {
    if (character >= "0" && character <= "9") {
      return true;
    }
  }

  return false;
}

function hasEvidenceMarker(text: string): boolean {
  return (
    hasDigit(text) || EVIDENCE_MARKERS.some((marker) => text.includes(marker))
  );
}

function matchGroupBehavior(words: readonly string[]): string | undefined {
  const [first, subject, third, gerund] = words;

  if (
    first !== undefined &&
    subject !== undefined &&
    third === "keep" &&
    gerund !== undefined &&
    BROAD_GROUP_LEADS.includes(first) &&
    HUMAN_GROUP_SUBJECTS.includes(subject) &&
    GROUP_BEHAVIOR_GERUNDS.includes(gerund)
  ) {
    return `${first} ${subject} keep ${gerund}`;
  }

  return undefined;
}

function matchUniversalizing(sentence: string): string | undefined {
  const cleaned = cleanSentence(sentence, PREFIXES);
  const words = tokens(cleaned);
  const group = matchGroupBehavior(words);

  if (group !== undefined) {
    return group;
  }

  for (const subject of SUBJECT_PATTERNS) {
    if (!startsWithWords(words, subject)) {
      continue;
    }

    const window = words.slice(subject.length, subject.length + 4);
    const verb =
      window.find((candidate) => DESIRE_VERBS.includes(candidate)) ??
      window.find((candidate) => CERTAINTY_VERBS.includes(candidate));

    if (verb !== undefined) {
      return `${subject.join(" ")} ${verb}`;
    }
  }

  const vagueQuantifier = matchVagueQuantifierAbstractNoun(words, cleaned);
  if (vagueQuantifier !== undefined) {
    return vagueQuantifier;
  }

  return undefined;
}

function matchVagueQuantifierAbstractNoun(
  words: readonly string[],
  text: string
): string | undefined {
  if (hasEvidenceMarker(text)) {
    return undefined;
  }

  for (let index = 0; index < words.length; index += 1) {
    const single = words[index];
    const twoWord = `${words[index] ?? ""} ${words[index + 1] ?? ""}`;
    const quantifier = VAGUE_QUANTIFIERS.includes(twoWord)
      ? twoWord
      : VAGUE_QUANTIFIERS.find((candidate) => candidate === single);
    if (quantifier === undefined) {
      continue;
    }

    const nounStart = quantifier.includes(" ") ? index + 2 : index + 1;
    const first = words[nounStart];
    const second = words[nounStart + 1];
    const noun =
      first !== undefined && ABSTRACT_NOUNS.includes(first)
        ? first
        : second !== undefined &&
            first !== undefined &&
            ABSTRACT_MODIFIERS.includes(first) &&
            ABSTRACT_NOUNS.includes(second)
          ? second
          : undefined;

    if (noun !== undefined) {
      return `${quantifier} ${noun}`;
    }
  }

  return undefined;
}

const rule = oneToOneRule({
  detect: (unit) => {
    const matched = matchUniversalizing(unit.text);
    if (matched === undefined) {
      return [];
    }

    return [
      {
        evidence: matched,
        label: matched,
        range: { start: 0, end: unit.text.length }
      }
    ];
  },
  family: "syntactic-patterns",
  formatMessage: (report) =>
    `Universalizing claim found: ${report.evidence}. Replace the broad claim with a bounded claim.`,
  ruleId: "syntactic-patterns:universalizing-claims",
  unitKind: "sentence"
});

export default rule;
