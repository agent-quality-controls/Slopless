import type { TxtDocumentNode } from "@textlint/ast-node-types";
import type { TextlintRuleModule } from "@textlint/types";
import { sectionFirstSentences } from "../../../shared/text/sections.js";

const OPENERS = ["the interesting part is", "in the world of"];

const rule: TextlintRuleModule = (context) => {
  const { Syntax, RuleError, locator, report } = context;

  return {
    [Syntax.Document](node: TxtDocumentNode): void {
      for (const item of sectionFirstSentences(node)) {
        const lower = item.sentence.text.toLocaleLowerCase("en");
        const opener = OPENERS.find((phrase) => lower.startsWith(phrase));

        if (opener === undefined) {
          continue;
        }

        report(
          item.paragraph,
          new RuleError(
            `LLM opener found: "${opener}". Start with the concrete claim instead.`,
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
