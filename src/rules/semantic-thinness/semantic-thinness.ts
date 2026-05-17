import type { TxtDocumentNode } from "@textlint/ast-node-types";
import type { TextlintRuleModule } from "@textlint/types";
import { allParagraphSentences } from "../../shared/text/sections.js";
import { semanticThinnessPatterns } from "./private/pattern-data.js";
import {
  compileSemanticThinnessPatterns,
  findSemanticThinnessMatch
} from "./private/pattern-matcher.js";

const COMPILED_PATTERNS = compileSemanticThinnessPatterns(
  semanticThinnessPatterns
);

const rule: TextlintRuleModule = (context) => {
  const { Syntax, RuleError, locator, report } = context;

  return {
    [Syntax.Document](node: TxtDocumentNode): void {
      for (const item of allParagraphSentences(node)) {
        const match = findSemanticThinnessMatch(
          item.sentence.text,
          COMPILED_PATTERNS
        );
        if (match === undefined) {
          continue;
        }

        report(
          item.paragraph,
          new RuleError(
            `Semantic thinness (${match.patternId}): ${match.purpose} Matched template: ${match.signal}`,
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
