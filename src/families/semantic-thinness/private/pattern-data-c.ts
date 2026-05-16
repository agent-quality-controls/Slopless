import bodyEmotionShorthand from "../patterns/body-emotion-shorthand.json" with { type: "json" };
import emptyAtmosphereShift from "../patterns/empty-atmosphere-shift.json" with { type: "json" };
import gazeChoreography from "../patterns/gaze-choreography.json" with { type: "json" };
import type { SemanticThinnessPattern } from "./pattern-matcher.js";

export const semanticThinnessPatternSetC: readonly SemanticThinnessPattern[] = [
  bodyEmotionShorthand,
  emptyAtmosphereShift,
  gazeChoreography
];
