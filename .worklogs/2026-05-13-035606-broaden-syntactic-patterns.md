# Summary

Broadened existing textlint syntactic-pattern rules for generic lead-ins, repeated rhetorical frames, and universalizing claims. The full fixture corpus went from 768 to 820 syntactic findings with zero lost prior findings.

# Decisions Made

- Kept the new `the goal is to`, `the point is to`, `the job is to`, and adjacent `the goal/point/fix is` repeated-frame catches because corpus review showed they were slop patterns already visible in generated fixtures.
- Rejected bare `Research shows...` / `Research suggests...` authority padding because full-fixture review showed valid cited or quantified evidence claims.
- Rejected `apparently` as a softening signal because it caught literal apparent-state prose.
- Rejected `need` as a universalizing verb because it caught factual quantified health claims such as adult sleep needs.

# Key Files For Context

- `packages/textlint-rules/src/families/syntactic-patterns/lead-ins/generic-signposting.ts`
- `packages/textlint-rules/src/families/syntactic-patterns/repetition/triple-repeat.ts`
- `packages/textlint-rules/src/families/syntactic-patterns/generalization/universalizing-claims.ts`
- `.plans/textlint-syntactic-patterns/lead-ins-good-catches.md`
- `.plans/textlint-syntactic-patterns/repetition-good-catches.md`
- `.plans/textlint-syntactic-patterns/generalization-bad-catches.md`
- `behavior/fixtures/textlint-rules/syntactic-patterns/family.md`

# Verification

- `npm run validate`
- `scripts/behavior-verify.sh`
- `scripts/behavior-replay.sh behavior/fixtures/textlint-rules/no-signal/family.md`
- Full fixture syntactic diff over 143 files: 768 before, 820 after, `lost=0`

# Next Steps

- Continue broadening only if new corpus evidence shows missed patterns inside existing families.
- Keep rejected broad templates in the bad-catches ledger so future agents do not re-add them.
