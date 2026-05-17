import type { TxtParentNode } from "@textlint/ast-node-types";
import type { TextlintRuleModule } from "@textlint/types";
import { RuleHelper } from "textlint-rule-helper";
import { splitSentences } from "../../shared/text/sentences.js";
import { sourceText } from "../../shared/text/traverse.js";

const SMART_QUOTES = new Set(["\u201C", "\u201D", "\u2018", "\u2019"]);

type SmartQuoteMatch = {
  readonly end: number;
  readonly matchedText: string;
  readonly start: number;
};

function findSmartQuotes(text: string): SmartQuoteMatch[] {
  const matches: SmartQuoteMatch[] = [];

  for (const sentence of splitSentences(text)) {
    let matchedText = "";
    let start: number | undefined;
    let end = sentence.start;

    for (let index = sentence.start; index < sentence.end; index += 1) {
      const character = text[index];
      if (character === undefined || !SMART_QUOTES.has(character)) {
        continue;
      }

      start ??= index;
      end = index + character.length;
      matchedText += character;
    }

    if (start !== undefined) {
      matches.push({ end, matchedText, start });
    }
  }

  return matches;
}

const rule: TextlintRuleModule = (context) => {
  const { Syntax, RuleError, locator, report } = context;
  const helper = new RuleHelper(context);
  const ignoredParents = [
    Syntax.List,
    Syntax.ListItem,
    Syntax.Table,
    Syntax.TableCell
  ];

  return {
    [Syntax.Paragraph](node: TxtParentNode): void {
      if (helper.isChildNode(node, ignoredParents)) {
        return;
      }

      const source = sourceText(node);

      for (const match of findSmartQuotes(source.text)) {
        report(
          node,
          new RuleError(
            `Smart quotes found: "${match.matchedText}". Replace curly quotes with straight quotes.`,
            {
              padding: locator.range([
                source.originalStartFor(match.start),
                source.originalEndFor(match.end)
              ])
            }
          )
        );
      }
    }
  };
};

export default rule;
