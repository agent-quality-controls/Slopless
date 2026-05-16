export function isWhitespace(value: string | undefined): boolean {
  return value === undefined || value.trim() === "";
}

export function splitWhitespace(text: string): string[] {
  const words: string[] = [];
  let current = "";

  for (const character of text) {
    if (character.trim() === "") {
      if (current !== "") {
        words.push(current);
        current = "";
      }
      continue;
    }

    current += character;
  }

  if (current !== "") {
    words.push(current);
  }

  return words;
}

export function countWhitespaceSeparatedWords(text: string): number {
  return splitWhitespace(text).length;
}
