# Summary

Added no-hit edge cases before widening semantic, syntactic, and narrative slop coverage. The widening adds abstract evaluative contrast-pair detection, broader atmosphere/body-emotion templates, wider discourse-frame slots, and more precise narrative body-action cues.

# Decisions Made

- Added no-hit controls first in the family case files, then mirrored them into topic-relevant corpus fixtures and preserve files.
- Fixed an existing `generic-signposting` false positive where concrete `the practical answer is...` and `the useful version is...` frames were reported.
- Limited contrastive pair matching to adjacent sentences in the same paragraph so blank-separated case lines do not collide.
- Rejected generic `mark`, `lift`, `rest`, and `lower` movement tokens after no-hit controls showed they catch purposeful technical or physical action too broadly.
- Kept phrase-level narrative cue expansion for `turned her head`, `rested her hands`, `lowered her voice`, and `tail hung still`.
- Accepted one removed `demonstrative-emphasis` finding because `The truth is that the latch was opened with Rory's spare key.` is a concrete fact, not empty emphasis.

# Key Files

- `.plans/2026-05-19-122829-widen-with-no-hit-controls.md`
- `behavior/fixtures/textlint-rules/cases/semantic-thinness/no-hits.md`
- `behavior/fixtures/textlint-rules/cases/syntactic-patterns/no-hits.md`
- `behavior/fixtures/textlint-rules/cases/narrative-slop/no-hits.md`
- `behavior/fixtures/textlint-rules/corpus/engineering-review.md`
- `behavior/fixtures/textlint-rules/corpus/narrative-scenes.md`
- `src/rules/semantic-thinness/patterns/deictic-summary.json`
- `src/rules/semantic-thinness/patterns/body-emotion-shorthand.json`
- `src/rules/semantic-thinness/patterns/empty-atmosphere-shift.json`
- `src/rules/syntactic-patterns/contrast/contrastive-aphorism.ts`
- `src/rules/syntactic-patterns/contrast/private/abstract-pair-gates.ts`
- `src/rules/syntactic-patterns/lead-ins/generic-signposting.ts`
- `src/rules/narrative-slop/body-action-density.ts`
- `src/shared/matchers/concrete-evidence.ts`

# Verification

- `node dist/cli.js behavior/fixtures/textlint-rules/cases/semantic-thinness/no-hits.md`
- `node dist/cli.js behavior/fixtures/textlint-rules/cases/syntactic-patterns/no-hits.md`
- `node dist/cli.js behavior/fixtures/textlint-rules/cases/narrative-slop/no-hits.md`
- `scripts/fixture3.sh approve --suite textlint-rules --comment "Widen slop rules with no-hit controls"`
- `scripts/fixture3.sh check --suite textlint-rules`
- `scripts/verify-all.sh`
- `npm run validate`

# Next Steps

- The next widening pass should focus on semantic-thinness patterns that did not produce new fixture hits in this pass, especially deictic explanation frames and body-emotion shorthand, using explicit positive cases and corpus prose first.
