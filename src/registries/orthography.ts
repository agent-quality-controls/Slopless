import colonDramatic from "../rules/orthography/colon-dramatic.js";
import emDashes from "../rules/orthography/em-dashes.js";
import exclamationDensity from "../rules/orthography/exclamation-density.js";
import fakeTimestamps from "../rules/orthography/fake-timestamps.js";
import sentenceCase from "../rules/orthography/sentence-case.js";
import smartQuotes from "../rules/orthography/smart-quotes.js";

export const orthographyRules = {
  "colon-dramatic": colonDramatic,
  "em-dashes": emDashes,
  "exclamation-density": exclamationDensity,
  "fake-timestamps": fakeTimestamps,
  "sentence-case": sentenceCase,
  "smart-quotes": smartQuotes
};
