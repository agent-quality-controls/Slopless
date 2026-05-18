import type { TextlintRuleModule } from "@textlint/types";
import { emitTextlintFinding } from "../../adapters/textlint/report.js";

const HIDDEN_UNICODE_CONTROLS = new Map([
  [0x00ad, "SOFT HYPHEN"],
  [0x200b, "ZERO WIDTH SPACE"],
  [0x200c, "ZERO WIDTH NON-JOINER"],
  [0x200d, "ZERO WIDTH JOINER"],
  [0x200e, "LEFT-TO-RIGHT MARK"],
  [0x200f, "RIGHT-TO-LEFT MARK"],
  [0x202a, "LEFT-TO-RIGHT EMBEDDING"],
  [0x202b, "RIGHT-TO-LEFT EMBEDDING"],
  [0x202c, "POP DIRECTIONAL FORMATTING"],
  [0x202d, "LEFT-TO-RIGHT OVERRIDE"],
  [0x202e, "RIGHT-TO-LEFT OVERRIDE"],
  [0x2060, "WORD JOINER"],
  [0x2066, "LEFT-TO-RIGHT ISOLATE"],
  [0x2067, "RIGHT-TO-LEFT ISOLATE"],
  [0x2068, "FIRST STRONG ISOLATE"],
  [0x2069, "POP DIRECTIONAL ISOLATE"],
  [0xfeff, "ZERO WIDTH NO-BREAK SPACE / BOM"]
]);

function codePointLabel(codePoint: number): string {
  return `U+${codePoint.toString(16).toUpperCase().padStart(4, "0")}`;
}

const rule: TextlintRuleModule = (context) => {
  const { Syntax, getSource } = context;

  return {
    [Syntax.Str](node): void {
      const text = getSource(node);
      let start = 0;

      for (const character of text) {
        const codePoint = character.codePointAt(0);
        const name =
          codePoint === undefined
            ? undefined
            : HIDDEN_UNICODE_CONTROLS.get(codePoint);

        if (codePoint !== undefined && name !== undefined) {
          emitTextlintFinding(context, {
            node,
            ruleId: "orthography:hidden-unicode-controls",
            message: `Hidden Unicode control found: ${codePointLabel(codePoint)} ${name}. Remove the invisible character.`,
            range: { start, end: start + character.length }
          });
        }

        start += character.length;
      }
    }
  };
};

export default rule;
