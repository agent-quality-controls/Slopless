# Summary

Broadened TypeScript syntactic-pattern detection beyond Rust parity with constrained slot templates. The retained corpus delta is 20 new findings across 143 fixtures: 10 generic lead-ins, 5 authority padding, 2 boilerplate conclusions, 2 softening-language findings, and 1 universalizing claim.

# Decisions Made

- Generalized lead-ins through evaluative adjective plus frame noun templates, plus broader `the key/point/trick is to` and `what works/changes is` frames.
- Generalized boilerplate conclusions through short tail-position formula closers like `That is the point`.
- Generalized authority padding through authority subjects (`research`, `science`, `evidence`, `data`, `studies`) plus generic predicates like `is clear`, `shows`, and `suggests`.
- Tested an aggressive softening expansion first, then removed `can`, `often`, `tends to`, and `for some people` because they produced valid medical and psychology nuance catches.

# Key Files

- `.plans/2026-05-13-031704-broaden-syntactic-patterns.md`
- `packages/textlint-rules/src/families/syntactic-patterns/lead-ins/generic-signposting.ts`
- `packages/textlint-rules/src/families/syntactic-patterns/closers/boilerplate-conclusion.ts`
- `packages/textlint-rules/src/families/syntactic-patterns/authority/authority-padding.ts`
- `packages/textlint-rules/src/families/syntactic-patterns/generalization/softening-language.ts`
- `packages/textlint-rules/src/families/syntactic-patterns/generalization/universalizing-claims.ts`
- `behavior/fixtures/textlint-rules/syntactic-patterns/family.md`

# Verification

- `npm run validate`
- `./scripts/behavior-verify.sh`
- `python3 scripts/verify-textlint-implementation-manifest.py --manifest .plans/2026-05-12-203442-textlint-implementation-plan.md.manifest.toml all`
- Corpus comparison: syntactic-pattern findings moved from 743 to 763 after false-positive tightening.

# Next Steps

- Continue this same broaden-then-review workflow on phrase and word data if broader slop coverage is still needed.
