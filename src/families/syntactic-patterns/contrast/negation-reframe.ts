import type { TxtParentNode } from "@textlint/ast-node-types";
import type { TextlintRuleModule } from "@textlint/types";
import { findNegationReframes } from "./private/negation-reframe-matcher.js";
import { sourceText } from "../../../shared/text/traverse.js";

const rule: TextlintRuleModule = (context) => {
  const { Syntax, RuleError, locator, report } = context;

  return {
    [Syntax.Paragraph](node: TxtParentNode): void {
      const source = sourceText(node);

      for (const match of findNegationReframes(source.text)) {
        report(
          node,
          new RuleError(
            `Negation reframe found: "${match.text}". Rewrite without the not-X-then-Y construction.`,
            {
              padding: locator.range([
                source.originalStartFor(match.start),
                source.originalEndFor(match.end)
              ])
            }
          )
        );
      }
    }
  };
};

export default rule;
