# Summary

Migrated `required-terms` and `recommended-terms` into the TypeScript textlint rule package under the `term-policy` family. Added fixture-local textlint config for term-policy behavior replay so these project-policy rules stay no-op without explicit options.

# Decisions Made

- `term-policy` rules read textlint rule options instead of package-owned defaults. Rust term-policy checks are config-driven, and defaults created false positives across unrelated behavior fixtures.
- `recommended-terms` keeps Rust's rough suffix stripping for inflection matching. The fixture config sets `minCount` high enough to prove a failure while still proving exact and inflected term counting.
- `behavior-replay.sh` now supports fixture-local `.textlintrc.json` files. It switches to config-based rule loading only for that fixture so configured policy rules can be tested without leaking into every fixture.

# Key Files

- `packages/textlint-rules/src/families/term-policy/required-terms.ts`
- `packages/textlint-rules/src/families/term-policy/recommended-terms.ts`
- `packages/textlint-rules/src/registries/term-policy.ts`
- `behavior/fixtures/textlint-rules/term-policy/.textlintrc.json`
- `scripts/behavior-replay.sh`
- `.plans/2026-05-13-015916-migrate-term-policy-textlint.md`

# Verification

- `npm run validate` from `packages/textlint-rules`
- `./scripts/behavior-verify.sh`
- `python3 scripts/verify-textlint-implementation-manifest.py --manifest .plans/2026-05-12-203442-textlint-implementation-plan.md.manifest.toml all`

# Next Steps

- Migrate the next Rust rule family that already has a clear TypeScript taxonomy target.
