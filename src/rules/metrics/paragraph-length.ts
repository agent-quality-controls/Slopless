import type { TxtDocumentNode } from "@textlint/ast-node-types";
import type { TextlintRuleModule } from "@textlint/types";
import { allParagraphs } from "../../shared/text/sections.js";
import { splitSentences } from "../../shared/text/sentences.js";

const MAX_SENTENCES = 6;

const rule: TextlintRuleModule = (context) => {
  const { Syntax, RuleError, locator, report } = context;

  return {
    [Syntax.Document](node: TxtDocumentNode): void {
      for (const item of allParagraphs(node)) {
        const sentenceCount = splitSentences(item.text).length;

        if (sentenceCount <= MAX_SENTENCES) {
          continue;
        }

        report(
          item.paragraph,
          new RuleError(
            `Paragraph has ${sentenceCount} sentences. Keep paragraphs to ${MAX_SENTENCES} sentences or fewer.`,
            {
              padding: locator.range([0, item.source.text.length])
            }
          )
        );
      }
    }
  };
};

export default rule;
