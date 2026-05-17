import demonstrativeEmphasis from "../../rules/syntactic-patterns/repetition/demonstrative-emphasis.js";
import emptyEmphasis from "../../rules/syntactic-patterns/repetition/empty-emphasis.js";
import fragmentStacking from "../../rules/syntactic-patterns/repetition/fragment-stacking.js";
import tripleRepeat from "../../rules/syntactic-patterns/repetition/triple-repeat.js";

export const repetitionRules = {
  "demonstrative-emphasis": demonstrativeEmphasis,
  "empty-emphasis": emptyEmphasis,
  "fragment-stacking": fragmentStacking,
  "triple-repeat": tripleRepeat
};
