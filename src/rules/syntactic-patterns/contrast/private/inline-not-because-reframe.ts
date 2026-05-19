import { hasAbstractNegationPayoff } from "./negation-context-gates.js";
import { startsWithWords } from "./negation-reframe-parts.js";
import { hasConcreteCorrectionEvidence } from "../../../../shared/matchers/concrete-evidence.js";
import type { SplitSentence } from "../../../../shared/text/sentences.js";
import type { Token } from "../../../../shared/text/tokens.js";

export type InlineNotBecauseMatch = {
  readonly end: number;
  readonly start: number;
  readonly text: string;
};

export function inlineNotBecauseReframe(
  sentence: SplitSentence,
  tokens: readonly Token[]
): InlineNotBecauseMatch | undefined {
  if (
    !startsWithWords(tokens, ["not", "because"]) ||
    !hasAbstractNegationPayoff(tokens)
  ) {
    return undefined;
  }

  for (let index = 2; index < tokens.length - 1; index += 1) {
    if (
      tokens[index]?.normalized === "but" &&
      tokens[index + 1]?.normalized === "because" &&
      !hasConcreteCorrectionEvidence(sentence.text)
    ) {
      return {
        end: sentence.end,
        start: sentence.start,
        text: sentence.text
      };
    }
  }

  return undefined;
}
