import {
  cleanSentence,
  startsWithWords,
  tokens
} from "../../../../shared/matchers/prose-patterns.js";
import { hasConcreteImplementationSummary } from "../../../../shared/matchers/concrete-evidence.js";

const PREFIXES = ["and ", "but ", "so ", "because "];
const ABSTRACT_CONTRAST_NOUNS = ["revelations", "vibe", "virtues"];
const ADVISORY_NEGATIVE_NOUNS = ["buffet", "elegance"];
const HUMAN_PLURAL_SUBJECTS = ["kids", "children", "people"];
const IMPERATIVE_CONTRAST_VERBS = ["bring"];
const ADVISORY_MODAL_SUBJECTS = ["i"];
const ADVISORY_MODAL_VERBS = ["give", "expect"];

type Part =
  | { readonly kind: "article" }
  | { readonly kind: "any" }
  | { readonly kind: "exact"; readonly value: string }
  | { readonly kind: "oneOf"; readonly values: readonly string[] };

const ARTICLE: Part = { kind: "article" };
const ANY: Part = { kind: "any" };

function exact(value: string): Part {
  return { kind: "exact", value };
}

function oneOf(values: readonly string[]): Part {
  return { kind: "oneOf", values };
}

function partMatches(word: string | undefined, part: Part): boolean {
  if (word === undefined) {
    return false;
  }

  if (part.kind === "any") {
    return true;
  }
  if (part.kind === "article") {
    return word === "a" || word === "an" || word === "the";
  }
  if (part.kind === "exact") {
    return word === part.value;
  }

  return part.values.includes(word);
}

function matchesPattern(
  words: readonly string[],
  pattern: readonly Part[]
): boolean {
  if (words.length < pattern.length) {
    return false;
  }

  for (let index = 0; index < pattern.length; index += 1) {
    const part = pattern[index];
    if (part === undefined || !partMatches(words[index], part)) {
      return false;
    }
  }

  return true;
}

function matchesArticleNounContrast(
  words: readonly string[],
  leadingVerbs: readonly string[],
  contrastNouns: readonly string[]
): boolean {
  return matchesPattern(words, [
    oneOf(leadingVerbs),
    ARTICLE,
    ANY,
    exact("not"),
    ARTICLE,
    oneOf(contrastNouns)
  ]);
}

function matchesModalArticleNounContrast(words: readonly string[]): boolean {
  return matchesPattern(words, [
    oneOf(ADVISORY_MODAL_SUBJECTS),
    exact("would"),
    oneOf(ADVISORY_MODAL_VERBS),
    ARTICLE,
    ANY,
    exact("not"),
    ARTICLE,
    oneOf(ADVISORY_NEGATIVE_NOUNS)
  ]);
}

function matchesSubjectGetInContrast(words: readonly string[]): boolean {
  return matchesPattern(words, [
    oneOf(HUMAN_PLURAL_SUBJECTS),
    exact("get"),
    ANY,
    exact("in"),
    ANY,
    exact("not"),
    oneOf(ABSTRACT_CONTRAST_NOUNS)
  ]);
}

function matchShortSingle(words: readonly string[]): string | undefined {
  if (
    words.length <= 6 &&
    words[0] === "better" &&
    (words[2] === "create" || words[2] === "creates") &&
    words[3] === "better"
  ) {
    return "better-x-create-better-y";
  }

  if (
    words.length <= 8 &&
    words.at(-3) === "it" &&
    words.at(-2) === "changes" &&
    words.at(-1) === "everything"
  ) {
    return "it-changes-everything";
  }

  return undefined;
}

function matchPartSingle(words: readonly string[]): string | undefined {
  if (
    matchesPattern(words, [
      ANY,
      ANY,
      exact("is"),
      exact("the"),
      exact("part"),
      exact("that"),
      exact("sticks")
    ])
  ) {
    return "part-that-sticks";
  }

  if (
    matchesPattern(words, [
      oneOf(["that", "this", "it"]),
      exact("is"),
      exact("the"),
      exact("part"),
      exact("most"),
      ANY,
      exact("miss")
    ])
  ) {
    return "part-most-x-miss";
  }

  return undefined;
}

function matchArticleContrastSingle(
  words: readonly string[]
): string | undefined {
  if (
    matchesArticleNounContrast(
      words,
      IMPERATIVE_CONTRAST_VERBS,
      ABSTRACT_CONTRAST_NOUNS
    )
  ) {
    return "imperative-contrast-aphorism";
  }
  if (matchesModalArticleNounContrast(words)) {
    return "modal-advisory-contrast-aphorism";
  }
  if (matchesSubjectGetInContrast(words)) {
    return "reps-not-revelations";
  }

  return undefined;
}

function matchLooseContrastSingle(
  words: readonly string[]
): string | undefined {
  if (
    words.length <= 10 &&
    startsWithWords(words, ["mostly", "by", "treating"]) &&
    words.includes("like") &&
    words.includes("not") &&
    ABSTRACT_CONTRAST_NOUNS.includes(words.at(-1) ?? "")
  ) {
    return "treating-like-not-virtues";
  }
  if (
    matchesPattern(words, [
      exact("watch"),
      exact("for"),
      ARTICLE,
      exact("pattern"),
      exact("not"),
      exact("one"),
      exact("bad"),
      ANY
    ])
  ) {
    return "watch-for-pattern-not-week";
  }
  if (
    matchesPattern(words, [
      ANY,
      ANY,
      ANY,
      exact("like"),
      ARTICLE,
      ANY,
      exact("problem"),
      exact("not"),
      ARTICLE,
      ANY,
      exact("problem")
    ])
  ) {
    return "like-a-problem-not-a-problem";
  }

  return undefined;
}

export function matchSingleSentenceAphorism(
  sentence: string
): string | undefined {
  const stripped = cleanSentence(sentence, PREFIXES);
  const words = tokens(stripped);

  if (hasConcreteImplementationSummary(stripped)) {
    return undefined;
  }

  return (
    matchShortSingle(words) ??
    matchPartSingle(words) ??
    matchArticleContrastSingle(words) ??
    matchLooseContrastSingle(words)
  );
}
