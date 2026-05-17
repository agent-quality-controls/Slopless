import type { TxtDocumentNode } from "@textlint/ast-node-types";
import type { TextlintRuleModule } from "@textlint/types";
import { findPhraseMatches } from "../../shared/matchers/phrases.js";
import { allParagraphSentences } from "../../shared/text/sections.js";

const HUMBLE_BRAGGER_PHRASES = [
  "in my experience",
  "as someone who has",
  "having worked with"
];

const rule: TextlintRuleModule = (context) => {
  const { Syntax, RuleError, locator, report } = context;

  return {
    [Syntax.Document](node: TxtDocumentNode): void {
      for (const item of allParagraphSentences(node)) {
        for (const match of findPhraseMatches(
          item.sentence.text,
          HUMBLE_BRAGGER_PHRASES
        )) {
          report(
            item.paragraph,
            new RuleError(
              `Humble-bragging phrase found: "${match.text}". Remove the credentialing lead-in.`,
              {
                padding: locator.range([
                  item.source.originalStartFor(
                    item.sentence.start + match.start
                  ),
                  item.source.originalEndFor(item.sentence.start + match.end)
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
