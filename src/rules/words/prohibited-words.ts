import type { TextlintRuleModule } from "@textlint/types";
import prohibitedWords from "./data/prohibited-words.json" with { type: "json" };
import { findPhraseMatches } from "../../shared/matchers/phrases.js";

const rule: TextlintRuleModule = (context) => {
  const { Syntax, RuleError, getSource, locator, report } = context;

  return {
    [Syntax.Str](node): void {
      const text = getSource(node);

      for (const match of findPhraseMatches(text, prohibitedWords)) {
        report(
          node,
          new RuleError(
            `Prohibited word found: "${match.text}". Rewrite without this term.`,
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
