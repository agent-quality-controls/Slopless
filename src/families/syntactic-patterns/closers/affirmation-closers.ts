import type { TxtDocumentNode } from "@textlint/ast-node-types";
import type { TextlintRuleModule } from "@textlint/types";
import {
  allParagraphSentences,
  type SectionSentence,
  sectionLastSentences
} from "../../../shared/text/sections.js";
import { wordTokens } from "../../../shared/text/tokens.js";

const CLOSERS = ["and that's the key.", "that's what matters."];

function isFormulaLine(text: string): boolean {
  const lower = text.toLocaleLowerCase("en");

  return (
    wordTokens(text).length <= 6 &&
    (lower.startsWith("that's the ") || lower.startsWith("that is the "))
  );
}

function evidenceKey(item: SectionSentence): string {
  return `${item.paragraph.range[0]}:${item.sentence.start}:${item.sentence.end}`;
}

const rule: TextlintRuleModule = (context) => {
  const { Syntax, RuleError, locator, report } = context;

  return {
    [Syntax.Document](node: TxtDocumentNode): void {
      const reported = new Set<string>();

      for (const item of sectionLastSentences(node)) {
        const lower = item.sentence.text.toLocaleLowerCase("en");
        const closer = CLOSERS.find((phrase) => lower.endsWith(phrase));

        if (closer === undefined) {
          continue;
        }

        reported.add(evidenceKey(item));
        report(
          item.paragraph,
          new RuleError(
            `Affirmation closer found: "${closer}". Replace the empty affirmation with the actual conclusion.`,
            {
              padding: locator.range([
                item.source.originalStartFor(item.sentence.start),
                item.source.originalEndFor(item.sentence.end)
              ])
            }
          )
        );
      }

      for (const item of allParagraphSentences(node)) {
        const key = evidenceKey(item);
        if (reported.has(key) || !isFormulaLine(item.sentence.text)) {
          continue;
        }

        reported.add(key);
        report(
          item.paragraph,
          new RuleError(
            `Formula affirmation found: "${item.sentence.text}". Replace the empty formula line with substance.`,
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
