import type { TextlintRuleModule } from "@textlint/types";
import cliches from "./data/cliches.json" with { type: "json" };
import { findUnquotedPhraseMatches } from "../../shared/matchers/phrases.js";

const rule: TextlintRuleModule = (context) => {
  const { Syntax, RuleError, getSource, locator, report } = context;

  return {
    [Syntax.Str](node): void {
      const text = getSource(node);

      for (const match of findUnquotedPhraseMatches(text, cliches)) {
        report(
          node,
          new RuleError(
            `Cliche found: "${match.text}". Replace it with specific wording.`,
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
