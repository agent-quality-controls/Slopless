import type { TxtDocumentNode } from "@textlint/ast-node-types";
import type { TextlintRuleModule } from "@textlint/types";
import { allParagraphSentences } from "../../shared/text/sections.js";
import { wordTokens } from "../../shared/text/tokens.js";

const HEDGE_THRESHOLD = 2;

const HEDGE_WORDS = new Set([
  "might",
  "maybe",
  "perhaps",
  "possibly",
  "likely",
  "probably",
  "seems",
  "apparently"
]);

function hedgeCount(text: string): number {
  let count = 0;

  for (const token of wordTokens(text)) {
    if (HEDGE_WORDS.has(token.normalized)) {
      count += 1;
    }
  }

  return count;
}

const rule: TextlintRuleModule = (context) => {
  const { Syntax, RuleError, locator, report } = context;

  return {
    [Syntax.Document](node: TxtDocumentNode): void {
      for (const item of allParagraphSentences(node)) {
        const count = hedgeCount(item.sentence.text);

        if (count < HEDGE_THRESHOLD) {
          continue;
        }

        report(
          item.paragraph,
          new RuleError(
            `Hedge stacking found: ${count} hedge words in one sentence. Keep fewer than ${HEDGE_THRESHOLD}.`,
            {
              padding: locator.range([
                item.source.originalStartFor(item.sentence.start),
                item.source.originalEndFor(item.sentence.end)
              ])
            }
          )
        );
      }
    }
  };
};

export default rule;
