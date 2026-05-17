import type { TextlintRuleModule } from "@textlint/types";
import { RuleHelper } from "textlint-rule-helper";
import skunkedTerms from "./data/skunked-terms.json" with { type: "json" };
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

      for (const match of findUnquotedPhraseMatches(text, skunkedTerms)) {
        report(
          node,
          new RuleError(
            `Skunked term found: "${match.text}". Replace it with a less disputed word.`,
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
