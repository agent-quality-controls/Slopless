import {
  splitSentences,
  type SplitSentence
} from "../../shared/text/sentences.js";
import { type Token, wordTokens } from "../../shared/text/tokens.js";
import {
  oneToOneRule,
  type LocalDetection
} from "../private/textlint-rule-builders.js";

const RULE_ID = "narrative-slop:empty-beat";

function wordSet(words: string): ReadonlySet<string> {
  return new Set(words.split(" "));
}

const EMPTY_PAUSE_VERBS = wordSet("hesitated lingered paused stopped waited");
const EMPTY_PLACEHOLDER_VERBS = wordSet("lingered remained stood waited");
const EMPTY_DURATION_WORDS = wordSet("beat moment second");
const PLACE_PREPOSITIONS = wordSet("at beside by in near next outside");
const CAUSE_OR_PURPOSE_MARKERS = wordSet(
  "after as because before if since to until when while"
);
const PERSON_PRONOUNS = wordSet("he i she they we");
const POSSESSIVES = wordSet("her his its my our their your");
const BODY_PARTS = wordSet("ear ears tail tails whisker whiskers");
const BODY_TAG_VERBS = wordSet(
  "angled angling drooped drooping flicked flicking flattened flattening twitched twitching"
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

function hasPersonSubject(tokens: readonly Token[]): boolean {
  const first = tokens[0];
  return (
    first !== undefined &&
    (PERSON_PRONOUNS.has(first.normalized) || isCapitalized(first))
  );
}

function hasCauseOrPurpose(tokens: readonly Token[]): boolean {
  return tokens.some((token) => CAUSE_OR_PURPOSE_MARKERS.has(token.normalized));
}

function sentenceDetection(
  sentence: SplitSentence,
  label: string
): LocalDetection {
  return {
    evidence: sentence.text,
    label,
    range: { end: sentence.end, start: sentence.start }
  };
}

function isEmptyDurationPause(tokens: readonly Token[]): boolean {
  return (
    hasPersonSubject(tokens) &&
    EMPTY_PAUSE_VERBS.has(tokens[1]?.normalized ?? "") &&
    tokens[2]?.normalized === "for" &&
    (tokens[3]?.normalized === "a" || tokens[3]?.normalized === "one") &&
    EMPTY_DURATION_WORDS.has(tokens[4]?.normalized ?? "") &&
    !hasCauseOrPurpose(tokens.slice(5))
  );
}

function isEmptyPlaceholding(tokens: readonly Token[]): boolean {
  return (
    hasPersonSubject(tokens) &&
    EMPTY_PLACEHOLDER_VERBS.has(tokens[1]?.normalized ?? "") &&
    tokens.some(
      (token, index) => index > 1 && PLACE_PREPOSITIONS.has(token.normalized)
    ) &&
    !hasCauseOrPurpose(tokens.slice(2))
  );
}

function bodyTagStart(tokens: readonly Token[]): number | undefined {
  for (let index = 0; index < tokens.length - 2; index += 1) {
    if (
      POSSESSIVES.has(tokens[index]?.normalized ?? "") &&
      BODY_PARTS.has(tokens[index + 1]?.normalized ?? "") &&
      BODY_TAG_VERBS.has(tokens[index + 2]?.normalized ?? "")
    ) {
      return index;
    }
  }

  return undefined;
}

function bodyTagDetection(sentence: SplitSentence): LocalDetection | undefined {
  const tokens = wordTokens(sentence.text);
  const start = bodyTagStart(tokens);
  if (start === undefined || hasCauseOrPurpose(tokens.slice(start + 3))) {
    return undefined;
  }

  const first = tokens[start];
  const last = tokens[start + 2];
  if (first === undefined || last === undefined) {
    return undefined;
  }

  return {
    evidence: sentence.text.slice(first.start, last.end),
    label: "generic animal body tag",
    range: {
      end: sentence.start + last.end,
      start: sentence.start + first.start
    }
  };
}

function sentenceDetections(
  sentence: SplitSentence
): readonly LocalDetection[] {
  const tokens = wordTokens(sentence.text);
  const bodyTag = bodyTagDetection(sentence);

  if (isEmptyDurationPause(tokens)) {
    return [
      sentenceDetection(sentence, "empty hesitation beat"),
      ...(bodyTag === undefined ? [] : [bodyTag])
    ];
  }

  if (isEmptyPlaceholding(tokens)) {
    return [
      sentenceDetection(sentence, "empty placeholding beat"),
      ...(bodyTag === undefined ? [] : [bodyTag])
    ];
  }

  return bodyTag === undefined ? [] : [bodyTag];
}

const rule = oneToOneRule({
  detect: (unit) => splitSentences(unit.text).flatMap(sentenceDetections),
  family: "narrative-slop",
  formatMessage: (report) =>
    `Narrative empty beat: ${report.detections[0]?.label}. Replace placeholder hesitation, waiting, or animal body shorthand with concrete action or cause.`,
  ruleId: RULE_ID,
  unitKind: "paragraph"
});

export default rule;
