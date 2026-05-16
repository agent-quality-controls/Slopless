const SMART_TO_STRAIGHT_QUOTES = new Map<string, string>([
  ["\u2018", "'"],
  ["\u2019", "'"],
  ["\u201C", '"'],
  ["\u201D", '"']
]);

export function normalizeForMatch(text: string): string {
  let normalized = "";

  for (const char of text) {
    normalized += SMART_TO_STRAIGHT_QUOTES.get(char) ?? char;
  }

  return normalizeWhitespace(normalized).toLocaleLowerCase("en");
}

export function normalizeWhitespace(text: string): string {
  let normalized = "";
  let previousWasWhitespace = false;

  for (const char of text) {
    if (char.trim() === "") {
      if (!previousWasWhitespace) {
        normalized += " ";
      }
      previousWasWhitespace = true;
      continue;
    }

    normalized += char;
    previousWasWhitespace = false;
  }

  return normalized.trim();
}
