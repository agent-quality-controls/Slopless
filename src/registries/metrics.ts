import avgSentenceLength from "../families/metrics/avg-sentence-length.js";
import colemanLiau from "../families/metrics/coleman-liau.js";
import fleschKincaid from "../families/metrics/flesch-kincaid.js";
import gunningFog from "../families/metrics/gunning-fog.js";
import paragraphLength from "../families/metrics/paragraph-length.js";
import wordRepetition from "../families/metrics/word-repetition.js";

export const metricRules = {
  "avg-sentence-length": avgSentenceLength,
  "coleman-liau": colemanLiau,
  "flesch-kincaid": fleschKincaid,
  "gunning-fog": gunningFog,
  "paragraph-length": paragraphLength,
  "word-repetition": wordRepetition
};
