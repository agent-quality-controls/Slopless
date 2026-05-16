import type { TextlintRuleModule } from "@textlint/types";
import prohibitedPhrases from "./data/prohibited-phrases.json" with { type: "json" };
import { findPhraseMatches } from "../../shared/matchers/phrases.js";

const rule: TextlintRuleModule = (context) => {
  const { Syntax, RuleError, getSource, locator, report } = context;

  return {
    [Syntax.Str](node): void {
      const text = getSource(node);

      for (const match of findPhraseMatches(text, prohibitedPhrases)) {
        report(
          node,
          new RuleError(
            `Prohibited phrase found: "${match.text}". Rewrite without this phrase.`,
            {
              padding: locator.range([match.start, match.end])
            }
          )
        );
      }
    }
  };
};

export default rule;
