import { authorityRules } from "./syntactic-patterns/authority.js";
import { closerRules } from "./syntactic-patterns/closers.js";
import { contrastRules } from "./syntactic-patterns/contrast.js";
import { generalizationRules } from "./syntactic-patterns/generalization.js";
import { leadInRules } from "./syntactic-patterns/lead-ins.js";
import { llmArtifactRules } from "./syntactic-patterns/llm-artifacts.js";
import { repetitionRules } from "./syntactic-patterns/repetition.js";

export const syntacticPatternRules = {
  ...authorityRules,
  ...closerRules,
  ...contrastRules,
  ...generalizationRules,
  ...leadInRules,
  ...llmArtifactRules,
  ...repetitionRules
};
