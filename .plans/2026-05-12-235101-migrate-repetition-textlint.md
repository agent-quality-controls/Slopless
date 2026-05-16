# Goal

Migrate the Rust cadence repetition checks into the TypeScript textlint package under `syntactic-patterns/repetition`.

# Scope

Rust source checks:

- `fragment-stacking`
- `triple-repeat`
- `demonstrative-emphasis`

Textlint target files:

- `packages/textlint-rules/src/families/syntactic-patterns/repetition/fragment-stacking.ts`
- `packages/textlint-rules/src/families/syntactic-patterns/repetition/triple-repeat.ts`
- `packages/textlint-rules/src/families/syntactic-patterns/repetition/demonstrative-emphasis.ts`

# Approach

1. Update the textlint implementation manifest with the three repetition rules.
2. Add a repetition behavior fixture that triggers all three rules and includes clean counterexamples.
3. Port Rust rule behavior using the existing shared sentence traversal helpers.
4. Register the rules in `index.ts`, the `everything` preset, and package exports.
5. Run Rust on the fixture corpus for these three checks.
6. Run textlint on the same files for the migrated repetition directory.
7. Write context-bearing good-catch and diff reports, using full sentences or paragraphs.
8. Run package validation, behavior verification, and the manifest verifier.

# Key Decisions

- The rules belong in `syntactic-patterns/repetition` because they inspect repeated sentence skeletons, adjacent sentence windows, and short sentence templates.
- Do not put these in `phrases`; fixed wording is not the ownership boundary.
- Store full review context in report files, not matched opener words or fragments.

# Files To Modify

- `.plans/2026-05-12-203442-textlint-implementation-plan.md.manifest.toml`
- `packages/textlint-rules/src/families/syntactic-patterns/repetition/*.ts`
- `packages/textlint-rules/src/index.ts`
- `packages/textlint-rules/src/presets/everything.ts`
- `packages/textlint-rules/package.json`
- `behavior/fixtures/textlint-rules/syntactic-patterns/family.md`
- `behavior/fixtures/textlint-rules/syntactic-patterns/fixture.toml`
- `behavior/baselines/textlint-rules/syntactic-patterns.json`
- `.plans/*repetition*good-catches.md`
- `.plans/*repetition*diff.md`
