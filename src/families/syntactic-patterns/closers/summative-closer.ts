import type { TxtDocumentNode } from "@textlint/ast-node-types";
import type { TextlintRuleModule } from "@textlint/types";
import { sectionLastSentences } from "../../../shared/text/sections.js";

const SUMMATIVE_PATTERNS = [
  "and that's what makes",
  "that's why this",
  "that's why it works",
  "that is why it works",
  "that's why it matters",
  "that is why it matters",
  "that's why this matters",
  "that is why this matters"
];

const rule: TextlintRuleModule = (context) => {
  const { Syntax, RuleError, locator, report } = context;

  return {
    [Syntax.Document](node: TxtDocumentNode): void {
      for (const item of sectionLastSentences(node)) {
        const lower = item.sentence.text.toLocaleLowerCase("en");
        const pattern = SUMMATIVE_PATTERNS.find((phrase) =>
          lower.startsWith(phrase)
        );

        if (pattern === undefined) {
          continue;
        }

        report(
          item.paragraph,
          new RuleError(
            `Summative closer found: "${pattern}". End with the concrete point instead.`,
            {
              padding: locator.range([
                item.source.originalStartFor(item.sentence.start),
                item.source.originalEndFor(item.sentence.end)
              ])
            }
          )
        );
      }
    }
  };
};

export default rule;
