import {
  cleanSentence,
  tokens
} from "../../../../shared/matchers/prose-patterns.js";
import { hasConcreteImplementationSummary } from "../../../../shared/matchers/concrete-evidence.js";

const PREFIXES = ["and ", "but ", "so ", "because "];
const CONTRAST_FRAME_NOUNS = [
  "alignment",
  "answer",
  "choice",
  "change",
  "clarity",
  "execution",
  "fix",
  "focus",
  "move",
  "momentum",
  "plan",
  "point",
  "problem",
  "strategy",
  "work"
];
const ABSTRACT_DEFINITION_TAILS = [
  "coordinated",
  "discipline",
  "intention",
  "motion",
  "shared"
];
const DETERMINERS = ["a", "an", "the", "this", "that"];

function hasAny(words: readonly string[], values: readonly string[]): boolean {
  return words.some((word) => values.includes(word));
}

function matchesNotButContrast(
  words: readonly string[],
  notIndex: number,
  butIndex: number
): boolean {
  return (
    words.length <= 14 &&
    notIndex >= 0 &&
    butIndex > notIndex &&
    hasAny(words.slice(0, Math.min(notIndex, 5)), CONTRAST_FRAME_NOUNS) &&
    !DETERMINERS.includes(words[butIndex + 1] ?? "")
  );
}

function matchesLessMoreAbout(
  words: readonly string[],
  thanIndex: number,
  amount: "less" | "more"
): boolean {
  return (
    words.length <= 10 &&
    words[2] === "is" &&
    words[3] === amount &&
    words[4] === "about" &&
    thanIndex > 4
  );
}

function matchesDefinitionContrast(words: readonly string[]): boolean {
  return (
    words.length <= 12 &&
    words[1] === "is" &&
    words[2] === "not" &&
    (words[4] === "it" || words[5] === "it") &&
    words.includes("is") &&
    CONTRAST_FRAME_NOUNS.includes(words[0] ?? "") &&
    words.some((word) => ABSTRACT_DEFINITION_TAILS.includes(word))
  );
}

export function matchSameSentenceContrast(
  sentence: string
): string | undefined {
  const stripped = cleanSentence(sentence, PREFIXES);
  if (hasConcreteImplementationSummary(stripped)) {
    return undefined;
  }

  const words = tokens(stripped);
  const notIndex = words.indexOf("not");
  const butIndex = words.indexOf("but");
  const thanIndex = words.indexOf("than");

  if (matchesNotButContrast(words, notIndex, butIndex)) {
    return "not-x-but-y";
  }

  if (matchesLessMoreAbout(words, thanIndex, "less")) {
    return "less-about-than";
  }

  if (matchesLessMoreAbout(words, thanIndex, "more")) {
    return "more-about-than";
  }

  if (matchesDefinitionContrast(words)) {
    return "x-is-not-y-it-is-z";
  }

  return undefined;
}
