# AI Slop Gap Implementation

## Summary

Added manifest-backed coverage for the remaining AI-slop gaps that fit existing Slopless rule families. The change adds hidden Unicode artifact detection, expands existing assistant leakage and wrapper patterns, extends negative-pivot detection in `negation-reframe`, and backfills cases plus corpus coverage.

## Decisions Made

- Added `orthography:hidden-unicode-controls` as a new orthography rule because hidden Unicode controls are direct text artifacts, not stylistic patterns.
- Kept negative-pivot additions inside `negation-reframe` because that matcher already owns "not X, but Y" style contrast behavior.
- Expanded existing `llm-disclaimer`, `response-wrapper`, and `llm-openers` data instead of adding a new AI-slop family.
- Left broad standalone LLM vocabulary out of scope because it would create avoidable false positives without enough structure.
- Updated the split Slopless manifest to include `skills` in `package.json.files`, matching the already shipped skill installer surface.

## Key Files For Context

- `.plans/2026-05-18-153519-ai-slop-gap-implementation.md`
- `.plans/2026-05-18-153519-ai-slop-gap-implementation.md.manifest.toml`
- `scripts/verify-ai-slop-gaps.py`
- `src/rules/orthography/hidden-unicode-controls.ts`
- `src/rules/syntactic-patterns/contrast/private/negation-reframe-parts.ts`
- `src/rules/syntactic-patterns/contrast/private/negative-slop-frames.ts`
- `behavior/fixtures/textlint-rules/cases/orthography/hits.md`
- `behavior/fixtures/textlint-rules/cases/phrases/hits.md`
- `behavior/fixtures/textlint-rules/cases/syntactic-patterns/hits.md`
- `behavior/fixtures/textlint-rules/corpus/editorial-style.md`
- `behavior/fixtures/textlint-rules/corpus/engineering-review.md`

## Verification

- `scripts/verify-all.sh` passed.
- `scripts/fixture3.sh check --suite textlint-rules` passed with `status: matched`.
- `npm run validate` passed.

## Next Steps

- Continue source-backed expansion only where a pattern can be represented by an existing family or a clearly necessary new rule.
