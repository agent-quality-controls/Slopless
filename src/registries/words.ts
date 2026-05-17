import hedgeStacking from "../rules/words/hedge-stacking.js";
import llmVocabulary from "../rules/words/llm-vocabulary.js";
import prohibitedWords from "../rules/words/prohibited-words.js";
import simplicity from "../rules/words/simplicity.js";

export const wordRules = {
  "hedge-stacking": hedgeStacking,
  "llm-vocabulary": llmVocabulary,
  "prohibited-words": prohibitedWords,
  simplicity
};
