import bodyActionDensity from "../rules/narrative-slop/body-action-density.js";
import flatActionCadence from "../rules/narrative-slop/flat-action-cadence.js";
import narrativeCliches from "../rules/narrative-slop/narrative-cliches.js";
import perceptionVerbDensity from "../rules/narrative-slop/perception-verb-density.js";

export const narrativeSlopRules = {
  "body-action-density": bodyActionDensity,
  "flat-action-cadence": flatActionCadence,
  "perception-verb-density": perceptionVerbDensity,
  "narrative-cliches": narrativeCliches
};
