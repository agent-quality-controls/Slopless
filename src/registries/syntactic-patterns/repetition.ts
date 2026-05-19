import demonstrativeEmphasis from "../../rules/syntactic-patterns/repetition/demonstrative-emphasis.js";
import emptyEmphasis from "../../rules/syntactic-patterns/repetition/empty-emphasis.js";
import fragmentStacking from "../../rules/syntactic-patterns/repetition/fragment-stacking.js";
import repeatedPredicateEnd from "../../rules/syntactic-patterns/repetition/repeated-predicate-end.js";
import repeatedSentenceStarts from "../../rules/syntactic-patterns/repetition/repeated-sentence-starts.js";
import tripleRepeat from "../../rules/syntactic-patterns/repetition/triple-repeat.js";

export const repetitionRules = {
  "demonstrative-emphasis": demonstrativeEmphasis,
  "empty-emphasis": emptyEmphasis,
  "fragment-stacking": fragmentStacking,
  "repeated-predicate-end": repeatedPredicateEnd,
  "repeated-sentence-starts": repeatedSentenceStarts,
  "triple-repeat": tripleRepeat
};
