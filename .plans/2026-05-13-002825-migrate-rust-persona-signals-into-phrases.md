# Goal

Migrate checks from the Rust `persona-signals` source crate into the TypeScript `phrases` family.

# Scope

Rust source checks:

- `humble-bragger`
- `jargon-faker`

Textlint target files:

- `packages/textlint-rules/src/families/phrases/humble-bragger.ts`
- `packages/textlint-rules/src/families/phrases/jargon-faker.ts`

# Approach

1. Add manifest rows for the two rules under the `phrases` family.
2. Implement sentence-level phrase matching with the existing token phrase matcher.
3. Register the rules in package exports, phrase registry, preset, and behavior replay.
4. Add behavior fixture coverage with positive and negative examples.
5. Run Rust on the fixture corpus for the two checks.
6. Run textlint on the same files for the two checks.
7. Write context-bearing good-catch and diff reports.
8. Run validation, behavior verify, manifest verify, then commit.

# Key Decisions

- Place both rules in `phrases` because Rust implements them as fixed multi-word phrase containment, not syntactic templates.
- Use token-window phrase matching rather than raw substring matching because the textlint package already has a normalized phrase matcher.
- Compare textlint output against Rust before accepting any extra textlint catches.

# Files To Modify

- `.plans/2026-05-12-203442-textlint-implementation-plan.md.manifest.toml`
- `packages/textlint-rules/src/families/phrases/humble-bragger.ts`
- `packages/textlint-rules/src/families/phrases/jargon-faker.ts`
- `packages/textlint-rules/src/registries/phrases.ts`
- `packages/textlint-rules/src/presets/everything.ts`
- `packages/textlint-rules/package.json`
- `behavior/fixtures/textlint-rules/phrases/family.md`
- `behavior/fixtures/textlint-rules/phrases/fixture.toml`
- `behavior/baselines/textlint-rules/phrases.json`
- `.plans/*phrases-rust-persona-source*good-catches.md`
- `.plans/*phrases-rust-persona-source*diff.md`

# Verification Result

- `npm run validate`: pass.
- `./scripts/behavior-verify.sh`: pass.
- `python3 scripts/verify-textlint-implementation-manifest.py --manifest .plans/2026-05-12-203442-textlint-implementation-plan.md.manifest.toml all`: pass.
- Fixture corpus comparison: Rust and textlint both found 0 `humble-bragger` and 0 `jargon-faker` findings across the current fixture corpus.
- Synthetic phrase fixture catches 2 `humble-bragger` and 2 `jargon-faker` findings, and skips literal technical controls for `debug your build script` and `optimizing for latency`.
