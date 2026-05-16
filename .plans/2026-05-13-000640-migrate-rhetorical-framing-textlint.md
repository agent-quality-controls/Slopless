# Goal

Migrate the Rust rhetorical-framing checks into the TypeScript textlint package.

# Scope

Rust source checks:

- `llm-openers`
- `affirmation-closers`
- `summative-closer`
- `false-question`

Textlint target files:

- `packages/textlint-rules/src/families/syntactic-patterns/lead-ins/llm-openers.ts`
- `packages/textlint-rules/src/families/syntactic-patterns/closers/affirmation-closers.ts`
- `packages/textlint-rules/src/families/syntactic-patterns/closers/summative-closer.ts`
- `packages/textlint-rules/src/families/syntactic-patterns/closers/false-question.ts`

# Approach

1. Update the implementation manifest with the four rules.
2. Port Rust phrase/pattern behavior using shared sentence traversal.
3. Register rules in package registries, preset, package exports, and behavior replay.
4. Add behavior fixture coverage for the four rules with clean counterexamples.
5. Run Rust on the fixture corpus for the four checks.
6. Run textlint on the same files for lead-ins and closers.
7. Write context-bearing good-catch and diff reports.
8. Run validation, behavior verify, manifest verify, commit, then push.

# Key Decisions

- `llm-openers` belongs under `syntactic-patterns/lead-ins` because it flags opener sentence constructions.
- `affirmation-closers`, `summative-closer`, and `false-question` belong under `syntactic-patterns/closers` because they flag terminal sentence constructions.
- Store sentence context in reports, not only the matched phrase.

# Files To Modify

- `.plans/2026-05-12-203442-textlint-implementation-plan.md.manifest.toml`
- `packages/textlint-rules/src/shared/text/sections.ts`
- `packages/textlint-rules/src/families/syntactic-patterns/lead-ins/llm-openers.ts`
- `packages/textlint-rules/src/families/syntactic-patterns/closers/*.ts`
- `packages/textlint-rules/src/registries/syntactic-patterns.ts`
- `packages/textlint-rules/src/presets/everything.ts`
- `packages/textlint-rules/package.json`
- `scripts/behavior-replay.sh`
- `behavior/fixtures/textlint-rules/syntactic-patterns/family.md`
- `behavior/baselines/textlint-rules/syntactic-patterns.json`
- `.plans/*rhetorical-framing*good-catches.md`
- `.plans/*rhetorical-framing*diff.md`

# Verification Result

- `npm run validate`: pass.
- `./scripts/behavior-verify.sh`: pass.
- `python3 scripts/verify-textlint-implementation-manifest.py --manifest .plans/2026-05-12-203442-textlint-implementation-plan.md.manifest.toml all`: pass.
- Fixture corpus comparison: Rust and textlint both found 8 `affirmation-closers` findings, with zero Rust-only and zero textlint-only findings.
