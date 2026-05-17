import type { TxtDocumentNode } from "@textlint/ast-node-types";
import type { TextlintRuleModule } from "@textlint/types";
import { documentMetrics } from "../../shared/text/document.js";

const MAX_WORDS = 24;

const rule: TextlintRuleModule = (context) => {
  const { Syntax, RuleError, locator, report } = context;

  return {
    [Syntax.Document](node: TxtDocumentNode): void {
      const metrics = documentMetrics(node);
      if (metrics.sentenceCount === 0) {
        return;
      }

      const average = Math.floor(metrics.wordCount / metrics.sentenceCount);
      if (average <= MAX_WORDS) {
        return;
      }

      report(
        node,
        new RuleError(
          `Average sentence length is ${average} words. Keep it at ${MAX_WORDS} or fewer.`,
          {
            padding: locator.at(0)
          }
        )
      );
    }
  };
};

export default rule;
