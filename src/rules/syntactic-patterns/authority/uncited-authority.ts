import {
  cleanSentence,
  startsWithWords,
  tokens
} from "../../../shared/matchers/prose-patterns.js";
import { oneToOneRule } from "../../private/textlint-rule-builders.js";

const PREFIXES = ["however, ", "but ", "and ", "so "];
const AUTHORITY_STARTS: readonly (readonly string[])[] = [
  ["according", "to", "experts"],
  ["according", "to", "researchers"],
  ["according", "to", "scientists"],
  ["data", "shows"],
  ["data", "suggests"],
  ["evidence", "shows"],
  ["evidence", "suggests"],
  ["experts", "agree"],
  ["experts", "recommend"],
  ["experts", "say"],
  ["experts", "warn"],
  ["it", "is", "commonly", "believed"],
  ["it", "is", "considered"],
  ["it", "is", "known", "for"],
  ["it", "is", "regarded", "as"],
  ["it", "is", "well", "established"],
  ["it", "is", "widely", "accepted"],
  ["many", "believe"],
  ["research", "confirms"],
  ["research", "indicates"],
  ["research", "proves"],
  ["research", "shows"],
  ["research", "suggests"],
  ["researchers", "agree"],
  ["researchers", "have", "found"],
  ["researchers", "say"],
  ["researchers", "warn"],
  ["science", "says"],
  ["science", "shows"],
  ["scientists", "agree"],
  ["scientists", "say"],
  ["scientists", "warn"],
  ["some", "argue"],
  ["some", "critics", "argue"],
  ["studies", "confirm"],
  ["studies", "indicate"],
  ["studies", "prove"],
  ["studies", "show"],
  ["studies", "suggest"]
];
const NAMED_SOURCES = [
  "american academy of pediatrics",
  "american psychological association",
  "centers for disease control",
  "cdc",
  "fda",
  "medlineplus",
  "mayo clinic",
  "national institutes of health",
  "nih",
  "world health organization",
  "who"
];
const CITATION_MARKERS = [
  "doi:",
  "et al",
  "http://",
  "https://",
  "pmid:",
  "source:"
];
const MIN_AUTHORITY_TOKENS = 8;

function authorityStart(words: readonly string[]): string | undefined {
  const match = AUTHORITY_STARTS.find((pattern) =>
    startsWithWords(words, pattern)
  );
  return match?.join(" ");
}

function hasCitationMarker(text: string): boolean {
  if (text.includes("[") && text.includes("](")) {
    return true;
  }

  if (text.includes("(") && text.includes(")")) {
    return true;
  }

  return CITATION_MARKERS.some((marker) => text.includes(marker));
}

function hasNamedSource(text: string): boolean {
  return NAMED_SOURCES.some((source) => text.includes(source));
}

function hasDigit(text: string): boolean {
  for (const character of text) {
    if (character >= "0" && character <= "9") {
      return true;
    }
  }

  return false;
}

function matchUncitedAuthority(sentence: string): string | undefined {
  const cleaned = cleanSentence(sentence, PREFIXES);
  if (
    hasCitationMarker(cleaned) ||
    hasNamedSource(cleaned) ||
    hasDigit(cleaned)
  ) {
    return undefined;
  }

  const words = tokens(cleaned);
  if (words.length < MIN_AUTHORITY_TOKENS) {
    return undefined;
  }

  return authorityStart(words);
}

const rule = oneToOneRule({
  detect: (unit) => {
    const matched = matchUncitedAuthority(unit.text);
    if (matched === undefined) {
      return [];
    }

    return [
      {
        evidence: matched,
        label: "uncited authority",
        range: { end: unit.text.length, start: 0 }
      }
    ];
  },
  family: "syntactic-patterns",
  formatMessage: (report) =>
    `Uncited authority found: ${report.evidence}. Name the source, cite the evidence, or make the claim directly.`,
  ruleId: "syntactic-patterns:uncited-authority",
  unitKind: "sentence"
});

export default rule;
