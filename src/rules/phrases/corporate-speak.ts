import corporateAbstractionPatterns from "./data/corporate-abstraction-patterns.json" with { type: "json" };
import corporateSpeak from "./data/corporate-speak.json" with { type: "json" };
import {
  findUnquotedPhraseMatches,
  type PhraseMatch,
  findUnquotedTokenTemplateMatches
} from "../../shared/matchers/phrases.js";
import { wordTokens } from "../../shared/text/tokens.js";
import { oneToOneRule } from "../private/textlint-rule-builders.js";

const LITERAL_DOUBLE_CLICK_CONTEXT = new Set([
  "button",
  "desktop",
  "file",
  "folder",
  "icon",
  "installer",
  "mouse",
  "screen",
  "shortcut",
  "window"
]);

const LEGAL_ENTITY_CONTEXT = new Set([
  "company",
  "entity",
  "legal",
  "lists",
  "partners",
  "registration"
]);

function allowedCorporatePhraseContext(
  text: string,
  match: PhraseMatch
): boolean {
  if (match.phrase !== "double-click on") {
    const words = wordTokens(text).map((token) => token.normalized);
    return (
      match.phrase === "next-generation growth" &&
      words.some((word) => LEGAL_ENTITY_CONTEXT.has(word))
    );
  }

  return wordTokens(text).some((token) =>
    LITERAL_DOUBLE_CLICK_CONTEXT.has(token.normalized)
  );
}

const rule = oneToOneRule({
  detect: (unit) =>
    [
      ...findUnquotedPhraseMatches(unit.text, corporateSpeak).filter(
        (match) => !allowedCorporatePhraseContext(unit.text, match)
      ),
      ...findUnquotedTokenTemplateMatches(
        unit.text,
        corporateAbstractionPatterns
      )
    ].map((match) => ({
      evidence: match.text,
      label: match.text,
      range: { start: match.start, end: match.end }
    })),
  family: "phrases",
  formatMessage: (report) =>
    `Corporate-speak phrase found: "${report.evidence}". Replace it with specific wording.`,
  ignoredAncestorTypes: ["Link", "LinkReference"],
  ruleId: "phrases:corporate-speak",
  unitKind: "str"
});

export default rule;
