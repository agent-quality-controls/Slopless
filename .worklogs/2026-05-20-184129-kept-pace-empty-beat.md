# Summary

Added `kept pace` as an empty movement beat under `narrative-slop:empty-beat`. Added the Liska/Cassia example to hit cases and corpus, plus no-hit controls for causal, measured, and timing uses.

# Decisions Made

- Kept the fix in `empty-beat` because this is filler movement, not a new rule concept.
- Matched person-subject `kept pace` with optional nearby character/place followers.
- Guarded any `kept pace` sentence that states cause or purpose with `because`, `to`, and the existing cause/purpose markers.
- Added no-hit controls for running, metronome timing, explicit cause, and explicit purpose.
- Left the G3TS debug files uncommitted.

# Key Files For Context

- `.plans/2026-05-20-183619-kept-pace-empty-beat.md`
- `src/rules/narrative-slop/empty-beat.ts`
- `behavior/fixtures/textlint-rules/cases/narrative-slop/hits.md`
- `behavior/fixtures/textlint-rules/cases/narrative-slop/no-hits.md`
- `behavior/fixtures/textlint-rules/corpus/narrative-scenes.md`
- `behavior/fixtures/textlint-rules/corpus/narrative-scenes.preserve.json`

# Verification

- `scripts/behavior-replay.sh /tmp/kept-pace-replay.*.md`
- `pnpm run build`
- `pnpm run lint`
- `pnpm run format:check`
- `pnpm run lint:css`
- `pnpm run typecov`
- `scripts/fixture3.sh check --feature textlint-rules`
- `scripts/verify-corpus-preserve.py`
- `scripts/verify-all.sh`

# Next Steps

- The direct `node dist/cli.js` local probe currently loads the repo `.textlintrc` and fails on `preset-slopless`; keep that separate from this rule change because fixture replay verifies the rule with explicit rule directories.
