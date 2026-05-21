import academicFormulaFrames from "./data/academic-formula-frames.json" with { type: "json" };
import { findUnquotedTokenTemplateMatches } from "../../shared/matchers/phrases.js";
import { oneToOneRule } from "../private/textlint-rule-builders.js";

const rule = oneToOneRule({
  detect: (unit) =>
    findUnquotedTokenTemplateMatches(unit.text, academicFormulaFrames).map(
      (match) => ({
        evidence: match.text,
        label: match.template,
        range: { start: match.start, end: match.end }
      })
    ),
  family: "academic-slop",
  formatMessage: (report) =>
    `Academic formula frame found: "${report.evidence}". Replace it with the concrete claim, method, or result.`,
  ignoredAncestorTypes: ["Link", "LinkReference"],
  ruleId: "academic-slop:academic-formula-frames",
  unitKind: "str"
});

export default rule;
