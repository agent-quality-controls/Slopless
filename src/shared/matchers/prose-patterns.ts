import { normalizeForMatch } from "../text/normalize.js";
import { stripOuterQuotes } from "../text/quotes.js";
import { wordTokens } from "../text/tokens.js";

export type SentenceMatch = {
  readonly kind: string;
  readonly signal: string;
};

export function cleanSentence(
  sentence: string,
  prefixes: readonly string[] = []
): string {
  const normalized = stripQuotedSegments(normalizeForMatch(sentence));
  return stripLeadingPrefixes(stripOuterQuotes(normalized), prefixes);
}

export function stripLeadingPrefixes(
  text: string,
  prefixes: readonly string[]
): string {
  let stripped = text;

  for (const prefix of prefixes) {
    if (stripped.startsWith(prefix)) {
      stripped = stripped.slice(prefix.length);
      break;
    }
  }

  return stripped;
}

export function stripQuotedSegments(text: string): string {
  let stripped = "";
  let quote: string | undefined;

  for (const character of text) {
    if (quote !== undefined) {
      if (isMatchingQuote(quote, character)) {
        quote = undefined;
      }
      continue;
    }

    if (isQuoteStart(character)) {
      quote = character;
      continue;
    }

    stripped += character;
  }

  return stripped;
}

function isQuoteStart(character: string): boolean {
  return character === '"' || character === "\u201C";
}

function isMatchingQuote(open: string, close: string): boolean {
  if (open === "\u201C") {
    return close === "\u201D";
  }

  return close === open;
}

export function tokens(text: string): readonly string[] {
  return wordTokens(text).map((token) => token.normalized);
}

export function containsAny(
  text: string,
  patterns: readonly string[]
): string | undefined {
  return patterns.find((pattern) => text.includes(pattern));
}

export function startsWithAnyText(
  text: string,
  patterns: readonly string[]
): string | undefined {
  return patterns.find((pattern) => text.startsWith(pattern));
}

export function textStartsWithPattern(text: string, pattern: string): boolean {
  if (!text.startsWith(pattern)) {
    return false;
  }

  const next = text.at(pattern.length);
  return (
    next === undefined ||
    next === " " ||
    next === "," ||
    next === "." ||
    next === ":" ||
    next === ";"
  );
}

export function tokensContainInOrder(
  sourceTokens: readonly string[],
  groups: readonly (readonly string[])[]
): boolean {
  let searchFrom = 0;

  for (const group of groups) {
    const position = sourceTokens
      .slice(searchFrom)
      .findIndex((token) => group.includes(token));

    if (position < 0) {
      return false;
    }

    searchFrom += position + 1;
  }

  return true;
}

export function trimTerminalPunctuation(text: string): string {
  let end = text.length;

  while (end > 0) {
    const character = text.at(end - 1);
    if (
      character !== "." &&
      character !== "!" &&
      character !== "?" &&
      character !== ":"
    ) {
      break;
    }
    end -= 1;
  }

  return text.slice(0, end);
}

export function startsWithWords(
  sourceTokens: readonly string[],
  expected: readonly string[]
): boolean {
  if (sourceTokens.length < expected.length) {
    return false;
  }

  for (let index = 0; index < expected.length; index += 1) {
    if (sourceTokens[index] !== expected[index]) {
      return false;
    }
  }

  return true;
}
