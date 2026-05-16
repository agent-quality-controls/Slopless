export type SplitSentence = {
  readonly end: number;
  readonly start: number;
  readonly text: string;
};

const SENTENCE_SEGMENTER = new Intl.Segmenter("en", {
  granularity: "sentence"
});

function isUppercaseLetter(character: string | undefined): boolean {
  if (character === undefined) {
    return false;
  }

  const lower = character.toLocaleLowerCase("en");
  const upper = character.toLocaleUpperCase("en");

  return lower !== upper && character === upper;
}

function firstNonWhitespaceIndex(text: string): number | undefined {
  for (let index = 0; index < text.length; index += 1) {
    if (text[index]?.trim() !== "") {
      return index;
    }
  }

  return undefined;
}

function trimEndIndex(text: string): number {
  for (let index = text.length; index > 0; index -= 1) {
    if (text[index - 1]?.trim() !== "") {
      return index;
    }
  }

  return 0;
}

function pushSegment(
  sentences: SplitSentence[],
  text: string,
  start: number,
  end: number
): void {
  const raw = text.slice(start, end);
  const trimStart = firstNonWhitespaceIndex(raw);
  if (trimStart === undefined) {
    return;
  }

  const trimEnd = trimEndIndex(raw);

  sentences.push({
    end: start + trimEnd,
    start: start + trimStart,
    text: raw.slice(trimStart, trimEnd)
  });
}

function splitMissingBreakSpacing(segment: SplitSentence): SplitSentence[] {
  const sentences: SplitSentence[] = [];
  let start = 0;

  for (let index = 0; index < segment.text.length - 1; index += 1) {
    const character = segment.text[index];
    const next = segment.text[index + 1];
    if (
      (character === "." || character === "?" || character === "!") &&
      isUppercaseLetter(next)
    ) {
      pushSegment(sentences, segment.text, start, index + 1);
      start = index + 1;
    }
  }

  pushSegment(sentences, segment.text, start, segment.text.length);

  return sentences.map((sentence) => ({
    end: segment.start + sentence.end,
    start: segment.start + sentence.start,
    text: sentence.text
  }));
}

export function splitSentences(text: string): SplitSentence[] {
  const sentences: SplitSentence[] = [];

  for (const segment of SENTENCE_SEGMENTER.segment(text)) {
    const trimStart = firstNonWhitespaceIndex(segment.segment);
    if (trimStart === undefined) {
      continue;
    }

    const trimEnd = trimEndIndex(segment.segment);
    const start = segment.index + trimStart;
    const end = segment.index + trimEnd;

    const sentence = {
      end,
      start,
      text: segment.segment.slice(trimStart, trimEnd)
    };

    sentences.push(...splitMissingBreakSpacing(sentence));
  }

  return sentences;
}
