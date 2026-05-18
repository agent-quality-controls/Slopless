# AI Slop Gap Implementation

## Goal

Implement the AI-slop source gaps that are not already covered by current Slopless rules.

## Scope

- Add one new orthography rule for hidden Unicode controls in prose text.
- Expand existing assistant-leakage and response-wrapper pattern data.
- Fill missing negative-pivot forms inside the existing `negation-reframe` matcher.
- Add minimal hit and no-hit cases.
- Add flowing corpus coverage for every new case.
- Add a deterministic manifest verifier for this change.

## Out Of Scope

- Do not create a new AI-slop family.
- Do not duplicate existing negative-pivot logic.
- Do not promote broad vocabulary words as standalone findings.
- Do not implement author-classification datasets as rules.

## Approach

- `src/rules/orthography/hidden-unicode-controls.ts`
  - Visit `Str` nodes so inline code and fenced code stay out of scope.
  - Detect invisible/control characters from the AI-slop source set.
  - Report the exact Unicode code point.

- `src/registries/orthography.ts`, `src/presets/everything.ts`, `package.json`
  - Register and export `orthography:hidden-unicode-controls`.

- `src/rules/phrases/data/llm-disclaimer-expansions.json`
  - Add missing explicit assistant leakage and knowledge-cutoff forms.

- `src/rules/syntactic-patterns/llm-artifacts/data/response-wrapper-patterns.json`
  - Add missing chat-scaffold and opener/closer forms.

- `src/rules/syntactic-patterns/lead-ins/llm-openers.ts`
  - Add source-backed section opener forms.

- `src/rules/syntactic-patterns/contrast/private/negation-reframe-parts.ts`
  - Recognize `not only`, `not merely`, and `no longer just` as contrast-pivot starts.

- `src/rules/syntactic-patterns/contrast/private/negative-slop-frames.ts`
  - Add `not because X. Because Y.` and `X is not the problem. Y is.` pair handling.

- Fixture files
  - Add hits and no-hits to existing family case files.
  - Add the same hit/no-hit material into flowing corpus files.

## Key Decisions

- Hidden Unicode is a direct rule because it is an artifact, not a style preference.
- Negative-pivot expansion belongs inside `negation-reframe` because the current matcher already owns this behavior.
- Assistant phrases stay split:
  - explicit AI identity and cutoff phrasing in `llm-disclaimer`;
  - chat wrappers and user-facing assistant scaffolding in `response-wrapper`;
  - section openers in `llm-openers`.
- Broad LLM vocabulary remains unchanged because standalone word bans create avoidable false positives.

## Files To Modify

- `.plans/2026-05-18-153519-ai-slop-gap-implementation.md.manifest.toml`
- `scripts/verify-ai-slop-gaps.py`
- `scripts/verify-all.sh`
- `src/rules/orthography/hidden-unicode-controls.ts`
- `src/registries/orthography.ts`
- `src/presets/everything.ts`
- `package.json`
- `src/rules/phrases/data/llm-disclaimer-expansions.json`
- `src/rules/syntactic-patterns/llm-artifacts/data/response-wrapper-patterns.json`
- `src/rules/syntactic-patterns/lead-ins/llm-openers.ts`
- `src/rules/syntactic-patterns/contrast/private/negation-reframe-parts.ts`
- `src/rules/syntactic-patterns/contrast/private/negative-slop-frames.ts`
- `behavior/fixtures/textlint-rules/cases/orthography/hits.md`
- `behavior/fixtures/textlint-rules/cases/orthography/no-hits.md`
- `behavior/fixtures/textlint-rules/cases/phrases/hits.md`
- `behavior/fixtures/textlint-rules/cases/phrases/no-hits.md`
- `behavior/fixtures/textlint-rules/cases/syntactic-patterns/hits.md`
- `behavior/fixtures/textlint-rules/cases/syntactic-patterns/no-hits.md`
- `behavior/fixtures/textlint-rules/corpus/editorial-style.md`
- `behavior/fixtures/textlint-rules/corpus/engineering-review.md`
