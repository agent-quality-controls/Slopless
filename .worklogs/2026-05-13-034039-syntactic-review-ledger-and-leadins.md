# Summary

Added an active syntactic-pattern review ledger under `.plans/textlint-syntactic-patterns` and broadened the next lead-in slice. Full-fixture syntactic findings moved from 763 to 768, with 5 retained `boilerplate-framing` catches and 1 rejected `lesson-framing` false positive documented.

# Decisions Made

- Created new review files instead of moving old `.plans` files because historical renames would add unrelated noise.
- Broadened `boilerplate-framing` with `one/another reason|factor|point|thing is` and wider vague enumeration words.
- Tightened `lesson-framing` after review so `The fix is not to dream smaller...` no longer matches `smaller` as a positive cue.
- Added broader `observer-guidance`, `summative-closer`, and `false-question` patterns even though the current fixture corpus produced no new hits for them.

# Key Files

- `.plans/2026-05-13-033404-syntactic-pattern-broadening-workflow.md`
- `.plans/textlint-syntactic-patterns/index.md`
- `.plans/textlint-syntactic-patterns/lead-ins-good-catches.md`
- `.plans/textlint-syntactic-patterns/lead-ins-bad-catches.md`
- `packages/textlint-rules/src/families/syntactic-patterns/lead-ins/boilerplate-framing.ts`
- `packages/textlint-rules/src/families/syntactic-patterns/lead-ins/lesson-framing.ts`
- `packages/textlint-rules/src/families/syntactic-patterns/lead-ins/observer-guidance.ts`

# Verification

- `npm run validate`
- `./scripts/behavior-verify.sh`
- `python3 scripts/verify-textlint-implementation-manifest.py --manifest .plans/2026-05-12-203442-textlint-implementation-plan.md.manifest.toml all`
- Full fixture syntactic diff: 763 to 768 findings after rejecting the bad `lesson-framing` catch.

# Next Steps

- Continue with another existing-rule broadening pass, likely `repetition` skeletons or narrower `generalization` stacks.
