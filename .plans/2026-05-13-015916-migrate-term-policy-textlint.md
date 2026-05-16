# Goal

Migrate Rust lexical term policy checks into the TypeScript `term-policy` family.

# Scope

Rust source checks:

- `required-terms`
- `recommended-terms`

Target family:

- `packages/textlint-rules/src/families/term-policy`

# Approach

1. Add manifest rows for `required-terms` and `recommended-terms`.
2. Add a `term-policy` registry and export it from the package index.
3. Read term policy from textlint rule options so unrelated fixtures stay no-op by default.
4. Implement `required-terms` as whole-token document-level missing-term checks.
5. Implement `recommended-terms` as document-level minimum pool coverage with the same rough suffix stripping as Rust.
6. Extend the term-policy behavior fixture with fixture-local textlint config and both positive and negative examples.
7. Run Rust and textlint on a synthetic comparable config/fixture and the existing fixture corpus where possible.
8. Write good-catch and diff reports.
9. Run package validation, behavior verify, manifest verify, write worklog, commit, push.

# Key Decisions

- `required-terms` and `recommended-terms` belong in `term-policy`, not `words`, because they express project/customer vocabulary contracts rather than prose quality patterns.
- The TypeScript rules are no-op without explicit options because Rust term-policy checks are config-driven and global defaults create policy noise.
- Matching stays whole-token because Rust only checks `collect_paragraph_words`, not arbitrary substrings.

# Files To Modify

- `.plans/2026-05-12-203442-textlint-implementation-plan.md.manifest.toml`
- `packages/textlint-rules/package.json`
- `packages/textlint-rules/cspell.config.json`
- `packages/textlint-rules/src/families/term-policy/required-terms.ts`
- `packages/textlint-rules/src/families/term-policy/recommended-terms.ts`
- `packages/textlint-rules/src/registries/term-policy.ts`
- `packages/textlint-rules/src/index.ts`
- `packages/textlint-rules/src/presets/everything.ts`
- `scripts/behavior-replay.sh`
- `behavior/fixtures/textlint-rules/term-policy/.textlintrc.json`
- `behavior/fixtures/textlint-rules/term-policy/family.md`
- `behavior/fixtures/textlint-rules/term-policy/fixture.toml`
- `behavior/baselines/textlint-rules/term-policy.json`
- `.plans/*term-policy*good-catches.md`
- `.plans/*term-policy*diff.md`
