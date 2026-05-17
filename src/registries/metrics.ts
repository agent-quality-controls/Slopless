import avgSentenceLength from "../rules/metrics/avg-sentence-length.js";
import colemanLiau from "../rules/metrics/coleman-liau.js";
import fleschKincaid from "../rules/metrics/flesch-kincaid.js";
import gunningFog from "../rules/metrics/gunning-fog.js";
import paragraphLength from "../rules/metrics/paragraph-length.js";
import wordRepetition from "../rules/metrics/word-repetition.js";

export const metricRules = {
  "avg-sentence-length": avgSentenceLength,
  "coleman-liau": colemanLiau,
  "flesch-kincaid": fleschKincaid,
  "gunning-fog": gunningFog,
  "paragraph-length": paragraphLength,
  "word-repetition": wordRepetition
};
