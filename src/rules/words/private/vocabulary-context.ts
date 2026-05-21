import {
  findUnquotedPhraseMatches,
  type PhraseMatch
} from "../../../shared/matchers/phrases.js";
import { wordTokens } from "../../../shared/text/tokens.js";

const META_CONTEXT_WORDS = new Set([
  "banned",
  "code",
  "column",
  "detector",
  "example",
  "field",
  "fixture",
  "guide",
  "literal",
  "name",
  "negative",
  "prompt",
  "quoted",
  "request",
  "says",
  "span",
  "stored",
  "style",
  "test",
  "word",
  "written"
]);

const DOMAIN_CONTEXT_BY_WORD = new Map<string, ReadonlySet<string>>([
  ["authentic", new Set(["label", "shellac", "signature", "signatures"])],
  [
    "catalyze",
    new Set(["catalyst", "chemistry", "palladium", "reaction", "substrate"])
  ],
  [
    "catalyzed",
    new Set(["catalyst", "chemistry", "palladium", "reaction", "substrate"])
  ],
  [
    "catalyzes",
    new Set(["catalyst", "chemistry", "palladium", "reaction", "substrate"])
  ],
  [
    "catalyzing",
    new Set(["catalyst", "chemistry", "palladium", "reaction", "substrate"])
  ],
  [
    "comprehensive",
    new Set(["bicarbonate", "chloride", "panel", "potassium", "sodium"])
  ],
  ["confidence", new Set(["interval", "level", "statistic"])],
  [
    "engagement",
    new Set(["active", "divided", "product", "requirement", "seats", "weekly"])
  ],
  ["frictionless", new Set(["bearing", "physics", "surface", "track"])],
  ["ai", new Set(["file", "format", "header", "metadata", "model"])],
  ["native", new Set(["file", "format", "header", "metadata", "model"])],
  ["next", new Set(["cpu", "cpus", "device", "manual", "processor"])],
  ["generation", new Set(["cpu", "cpus", "device", "manual", "processor"])],
  ["operationalize", new Set(["define", "lesson", "plan", "sentence"])],
  ["stakeholders", new Set(["contract", "governance", "rights", "voting"])],
  [
    "landscape",
    new Set([
      "drawing",
      "drainage",
      "exterior",
      "legend",
      "map",
      "orientation",
      "portrait",
      "retaining",
      "slope",
      "wall"
    ])
  ],
  ["leverage", new Set(["customer", "guide", "quoted", "request", "style"])],
  [
    "robust",
    new Set([
      "antibiotic",
      "cotton",
      "cycle",
      "cycles",
      "physician",
      "response",
      "sample",
      "wash"
    ])
  ],
  [
    "seamless",
    new Set([
      "concrete",
      "hydraulic",
      "joints",
      "line",
      "match",
      "migration",
      "poured",
      "schemas",
      "tube",
      "walkway"
    ])
  ]
]);

function tokenWords(text: string): readonly string[] {
  return wordTokens(text).map((token) => token.normalized);
}

function hasAny(
  words: readonly string[],
  values: ReadonlySet<string>
): boolean {
  return words.some((word) => values.has(word));
}

function isMetaMention(words: readonly string[]): boolean {
  return hasAny(words, META_CONTEXT_WORDS);
}

function hasDomainContext(phrase: string, words: readonly string[]): boolean {
  const context = DOMAIN_CONTEXT_BY_WORD.get(phrase);
  return context !== undefined && hasAny(words, context);
}

export function isVocabularyContextAllowed(
  text: string,
  phrase: string
): boolean {
  const words = tokenWords(text);

  return isMetaMention(words) || hasDomainContext(phrase, words);
}

export function findVocabularyMatches(
  text: string,
  phrases: readonly string[]
): PhraseMatch[] {
  return findUnquotedPhraseMatches(text, phrases).filter(
    (match) => !isVocabularyContextAllowed(text, match.phrase.toLowerCase())
  );
}
