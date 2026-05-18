import genericPressureOrStakes from "../patterns/generic-pressure-or-stakes.json" with { type: "json" };
import genericRealization from "../patterns/generic-realization.json" with { type: "json" };
import hollowSignificance from "../patterns/hollow-significance.json" with { type: "json" };
import lowInformationPhysicalBlocking from "../patterns/low-information-physical-blocking.json" with { type: "json" };
import vagueConnectivePayoff from "../patterns/vague-connective-payoff.json" with { type: "json" };
import vagueSummaryCost from "../patterns/vague-summary-cost.json" with { type: "json" };
import vagueThresholdChange from "../patterns/vague-threshold-change.json" with { type: "json" };
import type { SemanticThinnessPattern } from "./pattern-matcher.js";

export const semanticThinnessPatternSetB: readonly SemanticThinnessPattern[] = [
  genericPressureOrStakes,
  genericRealization,
  hollowSignificance,
  lowInformationPhysicalBlocking,
  vagueConnectivePayoff,
  vagueSummaryCost,
  vagueThresholdChange
];
