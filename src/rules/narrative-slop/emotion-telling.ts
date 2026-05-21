import { type Token, wordTokens } from "../../shared/text/tokens.js";
import {
  oneToOneRule,
  type LocalDetection
} from "../private/textlint-rule-builders.js";

const RULE_ID = "narrative-slop:emotion-telling";

function wordSet(words: string): ReadonlySet<string> {
  return new Set(words.split(" "));
}

const PERSON_PRONOUNS = wordSet("he i she they we");
const LINKING_VERBS = wordSet("felt was were");
const INTENSIFIERS = wordSet("really so still too very");
const EMOTION_WORDS = wordSet(
  "afraid angry ashamed confused furious glad happy lonely mad nervous sad scared upset worried"
);

function isCapitalized(token: Token): boolean {
  const first = token.text[0];
  if (first === undefined) {
    return false;
  }

  return (
    first.toLocaleUpperCase("en") === first &&
    first.toLocaleLowerCase("en") !== first
  );
}

function hasPersonSubject(token: Token | undefined): boolean {
  return (
    token !== undefined &&
    (PERSON_PRONOUNS.has(token.normalized) || isCapitalized(token))
  );
}

function emotionIndex(tokens: readonly Token[]): number | undefined {
  if (
    !hasPersonSubject(tokens[0]) ||
    !LINKING_VERBS.has(tokens[1]?.normalized ?? "")
  ) {
    return undefined;
  }

  let index = 2;
  while (INTENSIFIERS.has(tokens[index]?.normalized ?? "")) {
    index += 1;
  }

  return EMOTION_WORDS.has(tokens[index]?.normalized ?? "") ? index : undefined;
}

function isBluntEmotionLabel(tokens: readonly Token[]): boolean {
  const index = emotionIndex(tokens);
  return index !== undefined && tokens[index + 1] === undefined;
}

const rule = oneToOneRule({
  detect: (unit): readonly LocalDetection[] => {
    const tokens = wordTokens(unit.text);
    if (!isBluntEmotionLabel(tokens)) {
      return [];
    }

    return [
      {
        evidence: unit.text,
        label: "blunt emotion label",
        range: { end: unit.text.length, start: 0 }
      }
    ];
  },
  family: "narrative-slop",
  formatMessage: (report) =>
    `Emotion telling: ${report.detections[0]?.evidence}. Replace the blunt emotion label with a concrete action, thought, or choice.`,
  ruleId: RULE_ID,
  unitKind: "sentence"
});

export default rule;
