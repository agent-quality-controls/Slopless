const QUOTE_CHARS = new Set(['"', "'", "\u2018", "\u2019", "\u201C", "\u201D"]);

export function isMostlyQuoted(text: string): boolean {
  const trimmed = text.trim();

  if (trimmed.length < 2) {
    return false;
  }

  const first = trimmed[0];
  const last = trimmed.at(-1);

  return (
    first !== undefined &&
    last !== undefined &&
    QUOTE_CHARS.has(first) &&
    QUOTE_CHARS.has(last)
  );
}

export function stripOuterQuotes(text: string): string {
  if (!isMostlyQuoted(text)) {
    return text;
  }

  return text.slice(1, -1).trim();
}
