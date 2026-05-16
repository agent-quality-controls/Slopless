import type { TextlintRuleModule } from "@textlint/types";
import { wordTokens } from "../../shared/text/tokens.js";

const LLM_VOCABULARY = new Set([
  "delve",
  "vibrant",
  "landscape",
  "realm",
  "embark",
  "excels",
  "vital",
  "comprehensive",
  "intricate",
  "pivotal",
  "moreover",
  "tapestry"
]);

const rule: TextlintRuleModule = (context) => {
  const { Syntax, RuleError, getSource, locator, report } = context;

  return {
    [Syntax.Str](node): void {
      const text = getSource(node);

      for (const token of wordTokens(text)) {
        if (!LLM_VOCABULARY.has(token.normalized)) {
          continue;
        }

        report(
          node,
          new RuleError(
            `LLM vocabulary found: "${token.text}". Replace the stock diction with a concrete word.`,
            {
              padding: locator.range([token.start, token.end])
            }
          )
        );
      }
    }
  };
};

export default rule;
