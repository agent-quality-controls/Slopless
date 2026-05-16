# Summary

Migrated the Rust `llm-slop` rule set into the TypeScript textlint taxonomy. Added two non-syntactic rules and twelve syntactic-pattern rules with fixture coverage and regenerated baselines.

# Decisions Made

- `llm-disclaimer` moved to `phrases` because it matches fixed LLM leakage phrases.
- `llm-vocabulary` moved to `words` because it matches single-token stock diction.
- The remaining Rust `llm-slop` rules moved under syntactic subfamilies because they inspect sentence templates, slot patterns, adjacent sentences, or tail sentence position.
- Split the syntactic registry into subfamily registry files to keep dependency fan-in under the package lint limit.

# Key Files

- `.plans/2026-05-13-023908-migrate-llm-slop-textlint.md`
- `packages/textlint-rules/src/shared/matchers/llm-slop.ts`
- `packages/textlint-rules/src/families/phrases/llm-disclaimer.ts`
- `packages/textlint-rules/src/families/words/llm-vocabulary.ts`
- `packages/textlint-rules/src/families/syntactic-patterns/`
- `behavior/fixtures/textlint-rules/syntactic-patterns/family.md`

# Verification

- `npm run validate` from `packages/textlint-rules`
- `./scripts/behavior-verify.sh`
- `python3 scripts/verify-textlint-implementation-manifest.py --manifest .plans/2026-05-12-203442-textlint-implementation-plan.md.manifest.toml all`

# Next Steps

- Migrate `markdown-layout` only when document-policy layout rules are back in scope.
