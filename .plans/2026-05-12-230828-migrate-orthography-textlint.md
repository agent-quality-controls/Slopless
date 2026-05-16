# Migrate Orthography To Textlint

## Goal

Port the remaining Rust orthography rules to `@prosesmasher/textlint-rules` without changing rule ownership semantics.

## Scope

Rust source family: `apps/prosesmasher/crates/app/checks/style-signals/runtime`.

Target TypeScript family: `packages/textlint-rules/src/families/orthography`.

## Rust Rules To Map

- `em-dashes` -> already migrated.
- `smart-quotes` -> `orthography/smart-quotes.ts`.
- `sentence-case` -> `orthography/sentence-case.ts`.
- `exclamation-density` -> `orthography/exclamation-density.ts`.
- `fake-timestamps` -> `orthography/fake-timestamps.ts`.
- `colon-dramatic` -> `orthography/colon-dramatic.ts`.

## Approach

- Read each Rust rule and its synthetic tests.
- Implement the equivalent textlint rule in the orthography family.
- Register each rule in `src/index.ts` and `src/presets/everything.ts`.
- Expand `behavior/fixtures/textlint-rules/orthography/family.md` with positive examples and false-positive boundaries from Rust tests.
- Run Rust on the fixture corpus for orthography IDs.
- Run textlint on the same `.md` fixture corpus for migrated orthography IDs.
- Compare per rule by file and matched evidence.
- Treat Rust findings as the initial definitely-good set.
- Review textlint-only and Rust-only differences before accepting them.

## Files To Modify

- `packages/textlint-rules/src/families/orthography/*.ts`
- `packages/textlint-rules/src/index.ts`
- `packages/textlint-rules/src/presets/everything.ts`
- `behavior/fixtures/textlint-rules/orthography/family.md`
- `behavior/fixtures/textlint-rules/orthography/fixture.toml`
- `behavior/baselines/textlint-rules/orthography.json`
- parity review files under `.plans/`
