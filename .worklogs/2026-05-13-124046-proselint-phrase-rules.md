# Summary

Added three proselint-derived phrase rules to the textlint rule package: `corporate-speak`, `skunked-terms`, and `uncomparables`.

The rules use BSD-3-Clause source data from `proselint==0.16.0`, store data as JSON, and are enabled in the `everything` preset.

# Decisions Made

- Kept all three under `phrases` because they detect fixed terms or fixed modifier-plus-adjective expressions.
- Used textlint link-node skipping for these phrase-list rules because corpus review showed a source-title false positive.
- Added `least possible` as a local `uncomparables` exception because it is valid in ordinary prose.
- Kept `corporate-speak` despite zero retained corpus findings because the behavior fixture proves the rule path and the list is small and low-risk.

# Key Files For Context

- `packages/textlint-rules/src/families/phrases/corporate-speak.ts`
- `packages/textlint-rules/src/families/phrases/skunked-terms.ts`
- `packages/textlint-rules/src/families/phrases/uncomparables.ts`
- `packages/textlint-rules/src/families/phrases/data/corporate-speak.json`
- `packages/textlint-rules/src/families/phrases/data/skunked-terms.json`
- `packages/textlint-rules/src/families/phrases/data/uncomparables.json`
- `.plans/textlint-phrases/proselint-good-catches.md`
- `.plans/textlint-phrases/proselint-bad-catches.md`

# Verification

- `npm run validate` in `packages/textlint-rules`
- `scripts/behavior-replay.sh behavior/fixtures/textlint-rules/phrases/family.md`
- Full non-MDX fixture corpus through `scripts/behavior-replay.sh`: 202 files, 6 retained findings across the three new rules.

# Next Steps

- Decide whether `skunked-terms` is worth keeping after user review, because it is more usage-police than AI-slop detection.
