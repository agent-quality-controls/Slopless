# Summary

Added the Arden chapter 1 polished draft as a stable corpus fixture and widened existing negation-reframe and semantic-thinness checks to catch the three user-classified slop signals. The original writing file was only read; the fixture copy is the committed test surface.

# Decisions Made

- Treated `It wasn't just a sound; it was a vibration...` and `Bella didn't wait.` as syntactic-pattern negation findings, not new narrative rules.
- Treated `Everyone went quiet. Silence filled the yard.` as semantic-thinness empty scene state, with two spans on the same line.
- Added factual no-hit controls for the new negation and empty-scene-state patterns instead of loosening without guards.
- Added `Archi` to the spelling dictionary because it is copied fixture content from the chapter.

# Key Files For Context

- `.plans/2026-05-19-221506-catch-arden-polished-slop.md`
- `behavior/fixtures/textlint-rules/corpus/arden-chapter-1-polished.md`
- `behavior/fixtures/textlint-rules/corpus/arden-chapter-1-polished.preserve.json`
- `src/rules/syntactic-patterns/contrast/private/inline-short-negation.ts`
- `src/rules/syntactic-patterns/contrast/private/negation-reframe-matcher.ts`
- `src/rules/semantic-thinness/patterns/empty-scene-state.json`
- `src/rules/semantic-thinness/private/concrete-guards.ts`
- `fixture3.yaml`

# Verification

- `scripts/behavior-replay.sh behavior/fixtures/textlint-rules/corpus/arden-chapter-1-polished.md`
- `scripts/fixture3.sh check --feature textlint-rules`
- `scripts/verify-all.sh`
- `pnpm run validate`

# Next Steps

- If the current live chapter draft produces new misses after user edits, copy or extract those exact lines into cases before widening again.
