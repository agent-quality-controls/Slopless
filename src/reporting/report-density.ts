import { splitSentences } from "../shared/text/sentences.js";
import { wordTokens } from "../shared/text/tokens.js";
import type { DensityMatch, Detection } from "./types.js";

type DensityConfig<Group extends string> = {
  readonly detect: (text: string) => readonly Detection<Group>[];
  readonly groups: readonly Group[];
  readonly maxParagraphTokens: number;
  readonly maxWindowTokens: number;
  readonly paragraphMinimumHits: number;
  readonly windowMinimumHits: number;
  readonly windowSentences: number;
};

function densityMatchForSpan<Group extends string>(
  text: string,
  start: number,
  end: number,
  minimumHits: number,
  config: DensityConfig<Group>
): DensityMatch<Group> | undefined {
  const detections = config.detect(text.slice(start, end));

  for (const group of config.groups) {
    const hits = detections.filter((detection) => detection.group === group);
    if (hits.length < minimumHits) {
      continue;
    }

    const first = hits[0];
    const last = hits.at(-1);
    if (first === undefined || last === undefined) {
      continue;
    }

    return {
      count: hits.length,
      end: start + last.end,
      group,
      labels: [...new Set(hits.map((hit) => hit.label))],
      start: start + first.start
    };
  }

  return undefined;
}

export function firstDensityMatch<Group extends string>(
  text: string,
  config: DensityConfig<Group>
): DensityMatch<Group> | undefined {
  if (wordTokens(text).length <= config.maxParagraphTokens) {
    const paragraphMatch = densityMatchForSpan(
      text,
      0,
      text.length,
      config.paragraphMinimumHits,
      config
    );
    if (paragraphMatch !== undefined) {
      return paragraphMatch;
    }
  }

  const sentences = splitSentences(text);
  for (let index = 0; index < sentences.length; index += 1) {
    const window = sentences.slice(index, index + config.windowSentences);
    if (window.length < 2) {
      continue;
    }

    const first = window[0];
    const last = window.at(-1);
    if (first === undefined || last === undefined) {
      continue;
    }

    if (
      wordTokens(text.slice(first.start, last.end)).length >
      config.maxWindowTokens
    ) {
      continue;
    }

    const windowMatch = densityMatchForSpan(
      text,
      first.start,
      last.end,
      config.windowMinimumHits,
      config
    );
    if (windowMatch !== undefined) {
      return windowMatch;
    }
  }

  return undefined;
}
