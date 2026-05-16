import { wordTokens, type Token } from "../text/tokens.js";

export type PhraseMatch = {
  readonly end: number;
  readonly phrase: string;
  readonly start: number;
  readonly text: string;
};

type Span = {
  readonly end: number;
  readonly start: number;
};

const DOUBLE_QUOTE_OPENERS = new Set(['"', "“"]);
const DOUBLE_QUOTE_CLOSERS = new Set(['"', "”"]);

function phraseTokens(phrase: string): readonly string[] {
  return wordTokens(phrase).map((token) => token.normalized);
}

function tokensMatchAt(
  tokens: readonly Token[],
  phrase: readonly string[],
  startIndex: number
): boolean {
  if (startIndex + phrase.length > tokens.length) {
    return false;
  }

  for (let offset = 0; offset < phrase.length; offset += 1) {
    if (tokens[startIndex + offset]?.normalized !== phrase[offset]) {
      return false;
    }
  }

  return true;
}

export function findPhraseMatches(
  text: string,
  phrases: readonly string[]
): PhraseMatch[] {
  const tokens = wordTokens(text);
  const matches: PhraseMatch[] = [];

  for (const phrase of phrases) {
    const normalizedPhrase = phraseTokens(phrase);

    if (normalizedPhrase.length === 0) {
      continue;
    }

    for (let index = 0; index < tokens.length; index += 1) {
      if (!tokensMatchAt(tokens, normalizedPhrase, index)) {
        continue;
      }

      const first = tokens[index];
      const last = tokens[index + normalizedPhrase.length - 1];

      if (first === undefined || last === undefined) {
        continue;
      }

      matches.push({
        end: last.end,
        phrase,
        start: first.start,
        text: text.slice(first.start, last.end)
      });
    }
  }

  return matches;
}

function findDoubleQuoteSpans(text: string): readonly Span[] {
  const spans: Span[] = [];
  let quoteStart: number | undefined;

  for (let index = 0; index < text.length; index += 1) {
    const character = text[index];

    if (character === undefined) {
      continue;
    }

    if (quoteStart === undefined && DOUBLE_QUOTE_OPENERS.has(character)) {
      quoteStart = index;
      continue;
    }

    if (quoteStart !== undefined && DOUBLE_QUOTE_CLOSERS.has(character)) {
      spans.push({ end: index + 1, start: quoteStart });
      quoteStart = undefined;
    }
  }

  return spans;
}

function isInsideSpan(
  match: Pick<PhraseMatch, "end" | "start">,
  spans: readonly Span[]
): boolean {
  return spans.some(
    (span) => match.start >= span.start && match.end <= span.end
  );
}

export function findUnquotedPhraseMatches(
  text: string,
  phrases: readonly string[]
): PhraseMatch[] {
  const quoteSpans = findDoubleQuoteSpans(text);

  return findPhraseMatches(text, phrases).filter(
    (match) => !isInsideSpan(match, quoteSpans)
  );
}
