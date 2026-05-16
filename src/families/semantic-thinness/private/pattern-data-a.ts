import abstractContrast from "../patterns/abstract-contrast.json" with { type: "json" };
import abstractMetaphorClaim from "../patterns/abstract-metaphor-claim.json" with { type: "json" };
import emptyEmotionalWeather from "../patterns/empty-emotional-weather.json" with { type: "json" };
import emptySceneState from "../patterns/empty-scene-state.json" with { type: "json" };
import emptySceneTransition from "../patterns/empty-scene-transition.json" with { type: "json" };
import genericLessonExtraction from "../patterns/generic-lesson-extraction.json" with { type: "json" };
import type { SemanticThinnessPattern } from "./pattern-matcher.js";

export const semanticThinnessPatternSetA: readonly SemanticThinnessPattern[] = [
  abstractContrast,
  abstractMetaphorClaim,
  emptyEmotionalWeather,
  emptySceneState,
  emptySceneTransition,
  genericLessonExtraction
];
