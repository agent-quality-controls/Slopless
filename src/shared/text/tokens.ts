import { normalizeForMatch } from "./normalize.js";

const WORD_SEGMENTER = new Intl.Segmenter("en", { granularity: "word" });

export type Token = {
  readonly end: number;
  readonly normalized: string;
  readonly start: number;
  readonly text: string;
};

export function wordTokens(text: string): Token[] {
  const tokens: Token[] = [];

  for (const segment of WORD_SEGMENTER.segment(text)) {
    if (segment.isWordLike !== true) {
      continue;
    }

    tokens.push({
      end: segment.index + segment.segment.length,
      normalized: normalizeForMatch(segment.segment),
      start: segment.index,
      text: segment.segment
    });
  }

  return tokens;
}
