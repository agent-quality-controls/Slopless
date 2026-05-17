import type { TxtNode } from "@textlint/ast-node-types";
import type { TextlintRuleContext } from "@textlint/types";
import type { TextUnit } from "../../rules/types.js";
import type { RuleReport } from "../../reporting/types.js";

type TextlintTextUnit = TextUnit & {
  readonly node: TxtNode;
};

function isTextlintTextUnit(unit: TextUnit): unit is TextlintTextUnit {
  return (
    typeof unit.node === "object" && unit.node !== null && "type" in unit.node
  );
}

export function emitTextlintReport(
  context: Readonly<TextlintRuleContext>,
  unitsById: ReadonlyMap<string, TextUnit>,
  report: RuleReport
): void {
  const unit = unitsById.get(report.unitId);
  if (unit === undefined || !isTextlintTextUnit(unit)) {
    return;
  }

  const padding =
    report.range.start === report.range.end
      ? context.locator.at(report.range.start)
      : context.locator.range([report.range.start, report.range.end]);

  context.report(
    unit.node,
    new context.RuleError(report.message, {
      padding
    })
  );
}

export function emitTextlintReports(
  context: Readonly<TextlintRuleContext>,
  unitsById: ReadonlyMap<string, TextUnit>,
  reports: readonly RuleReport[]
): void {
  for (const report of reports) {
    emitTextlintReport(context, unitsById, report);
  }
}
