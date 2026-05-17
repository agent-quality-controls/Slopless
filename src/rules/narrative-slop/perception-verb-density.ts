import type { TxtDocumentNode } from "@textlint/ast-node-types";
import type { TextlintRuleModule } from "@textlint/types";
import { firstDensityMatch } from "../../reporting/report-density.js";
import type { Detection } from "../../reporting/types.js";
import { allParagraphs } from "../../shared/text/sections.js";
import { type Token, wordTokens } from "../../shared/text/tokens.js";

const PERCEPTION_VERBS = new Set([
  "look",
  "looks",
  "looked",
  "looking",
  "watch",
  "watches",
  "watched",
  "watching",
  "stare",
  "stares",
  "stared",
  "staring",
  "gaze",
  "gazes",
  "gazed",
  "gazing",
  "glance",
  "glances",
  "glanced",
  "glancing",
  "observe",
  "observes",
  "observed",
  "observing"
]);

const PURPOSE_LOOK_PARTICLES = new Set(["for", "up", "under", "into"]);
const MAX_PARAGRAPH_TOKENS = 80;
const MAX_WINDOW_TOKENS = 45;
const MIN_PARAGRAPH_HITS = 3;
const MIN_WINDOW_HITS = 2;
const WINDOW_SENTENCES = 3;
const GROUP = "perception verb";

type PerceptionGroup = typeof GROUP;

function isPurposeLook(tokens: readonly Token[], index: number): boolean {
  const token = tokens[index];
  const next = tokens[index + 1];

  return (
    token !== undefined &&
    token.normalized.startsWith("look") &&
    next !== undefined &&
    PURPOSE_LOOK_PARTICLES.has(next.normalized)
  );
}

function perceptionDetections(text: string): Detection<PerceptionGroup>[] {
  const tokens = wordTokens(text);
  return tokens
    .filter((token, index) => {
      return (
        PERCEPTION_VERBS.has(token.normalized) && !isPurposeLook(tokens, index)
      );
    })
    .map((token) => ({
      end: token.end,
      group: GROUP,
      label: token.normalized,
      start: token.start
    }));
}

const rule: TextlintRuleModule = (context) => {
  const { Syntax, RuleError, locator, report } = context;

  return {
    [Syntax.Document](node: TxtDocumentNode): void {
      for (const item of allParagraphs(node)) {
        const match = firstDensityMatch(item.text, {
          detect: perceptionDetections,
          groups: [GROUP],
          maxParagraphTokens: MAX_PARAGRAPH_TOKENS,
          maxWindowTokens: MAX_WINDOW_TOKENS,
          paragraphMinimumHits: MIN_PARAGRAPH_HITS,
          windowMinimumHits: MIN_WINDOW_HITS,
          windowSentences: WINDOW_SENTENCES
        });
        if (match === undefined) {
          continue;
        }

        report(
          item.paragraph,
          new RuleError(
            `Perception verb density: ${match.count} perception verbs in a short span (${match.labels.join(", ")}).`,
            {
              padding: locator.range([
                item.source.originalStartFor(match.start),
                item.source.originalEndFor(match.end)
              ])
            }
          )
        );
      }
    }
  };
};

export default rule;
