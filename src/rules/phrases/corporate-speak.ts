import type { TextlintRuleModule } from "@textlint/types";
import { RuleHelper } from "textlint-rule-helper";
import corporateAbstractionPatterns from "./data/corporate-abstraction-patterns.json" with { type: "json" };
import corporateSpeak from "./data/corporate-speak.json" with { type: "json" };
import {
  findUnquotedPhraseMatches,
  findUnquotedTokenTemplateMatches
} from "../../shared/matchers/phrases.js";

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

      const matches = [
        ...findUnquotedPhraseMatches(text, corporateSpeak),
        ...findUnquotedTokenTemplateMatches(text, corporateAbstractionPatterns)
      ];

      for (const match of matches) {
        report(
          node,
          new RuleError(
            `Corporate-speak phrase found: "${match.text}". Replace it with specific wording.`,
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
