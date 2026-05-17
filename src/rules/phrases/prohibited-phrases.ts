import type { TextlintRuleModule } from "@textlint/types";
import { RuleHelper } from "textlint-rule-helper";
import prohibitedPhrases from "./data/prohibited-phrases.json" with { type: "json" };
import { findUnquotedPhraseMatches } from "../../shared/matchers/phrases.js";

const rule: TextlintRuleModule = (context) => {
  const { Syntax, RuleError, getSource, locator, report } = context;
  const helper = new RuleHelper(context);
  const ignoredParents = [Syntax.Link, Syntax.LinkReference];

  return {
    [Syntax.Str](node): void {
      if (helper.isChildNode(node, ignoredParents)) {
        return;
      }

      const text = getSource(node);

      for (const match of findUnquotedPhraseMatches(text, prohibitedPhrases)) {
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
