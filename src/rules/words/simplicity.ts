import type { TxtDocumentNode } from "@textlint/ast-node-types";
import type { TextlintRuleModule } from "@textlint/types";
import simplicityPairs from "./data/simplicity-pairs.json" with { type: "json" };
import { allParagraphSentences } from "../../shared/text/sections.js";
import { wordTokens } from "../../shared/text/tokens.js";

const SIMPLE_BY_COMPLEX = new Map(
  simplicityPairs.map(([complex, simple]) => [complex, simple])
);

const rule: TextlintRuleModule = (context) => {
  const { Syntax, RuleError, locator, report } = context;

  return {
    [Syntax.Document](node: TxtDocumentNode): void {
      for (const item of allParagraphSentences(node)) {
        for (const token of wordTokens(item.sentence.text)) {
          const simple = SIMPLE_BY_COMPLEX.get(token.normalized);

          if (simple === undefined) {
            continue;
          }

          report(
            item.paragraph,
            new RuleError(
              `Complex word found: "${token.text}". Use "${simple}" instead.`,
              {
                padding: locator.range([
                  item.source.originalStartFor(
                    item.sentence.start + token.start
                  ),
                  item.source.originalEndFor(item.sentence.start + token.end)
                ])
              }
            )
          );
        }
      }
    }
  };
};

export default rule;
