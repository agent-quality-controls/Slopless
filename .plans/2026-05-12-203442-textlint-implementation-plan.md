# Textlint Implementation Plan

Date: 2026-05-12 20:34

## Goal

Implement the TypeScript textlint migration from the current taxonomy.

The target package is:

- `@prosesmasher/textlint-rules`

The first implementation slice must prove:

- textlint can run our rules
- source locations are usable
- regex is mechanically banned
- rule output is stable enough for fixture comparison
- one rule per observable layer can be ported without recreating the Rust runner
- behavior is protected through golden replay fixtures, not TDD-style unit assertions

## Source Plans

Use these plans as the source of truth:

- `.plans/2026-05-12-180446-textlint-rule-taxonomy.md`
- `.plans/2026-05-12-173250-textlint-full-migration-plan.md`

The taxonomy plan overrides old family/package names in the migration plan.

## Package Shape

Create one TypeScript package:

```text
packages/textlint-rules/
```

Package name:

```text
@prosesmasher/textlint-rules
```

Source layout:

```text
src/families/markdown-layout/
src/families/orthography/
src/families/metrics/
src/families/term-policy/
src/families/words/
src/families/phrases/
src/families/syntactic-patterns/
src/families/syntactic-patterns/llm-artifacts/
src/families/syntactic-patterns/lead-ins/
src/families/syntactic-patterns/contrast/
src/families/syntactic-patterns/closers/
src/families/syntactic-patterns/repetition/
src/families/syntactic-patterns/authority/
src/families/syntactic-patterns/generalization/
src/families/semantic-thinness/
src/presets/everything.ts
src/shared/text/
src/shared/matchers/
src/utils/
```

Do not create one package per preset.

Do not create one package per family.

## Dependencies

Runtime dependencies:

- `textlint`
- `@textlint/types`
- `textlint-rule-helper`
- `textlint-util-to-string`
- `sentence-splitter`

Development dependencies:

- `typescript`
- `eslint`
- `@typescript-eslint/parser`
- `@typescript-eslint/eslint-plugin`

Rejected runtime dependencies:

- regex helper packages
- `split-string-words`
- `natural`
- `retext-english`
- `nlcst-search`
- stale retext packages as runtime dependencies

## G3TS

Every TypeScript package must have G3TS guardrail wiring.

For the first package this means:

- add `packages/textlint-rules/guardrail3-ts.toml`
- add the relevant G3TS package or ESLint plugin dependencies after checking the current G3TS package set
- run G3TS through the package validation command
- keep G3TS config under manifest verification

## Regex Enforcement

Add ESLint guardrails before porting rules.

Ban:

- regex literals
- `new RegExp(...)`
- `RegExp(...)`
- imports matching regex helper packages

Allow exceptions only for:

- ESLint config
- build scripts
- generated files
- third-party package internals

No exception is allowed in:

- `src/families/`
- `src/shared/matchers/`

Verification:

- add a tiny fixture file with a regex literal and prove ESLint rejects it
- remove or ignore that fixture after the regex rejection is represented in the manifest verifier

## Shared Layer

Create shared text primitives before porting rules.

Required files:

```text
src/shared/text/normalize.ts
src/shared/text/quotes.ts
src/shared/text/tokens.ts
src/shared/text/sentences.ts
src/shared/text/traverse.ts
src/shared/matchers/phrases.ts
src/shared/matchers/syntactic-templates.ts
```

Responsibilities:

- `normalize.ts`: lowercase, smart quote normalization, whitespace normalization.
- `quotes.ts`: quote segment detection and quote skipping.
- `tokens.ts`: word tokenization using `Intl.Segmenter`.
- `sentences.ts`: wrapper around `sentence-splitter`.
- `traverse.ts`: textlint AST traversal helpers for prose nodes.
- `phrases.ts`: token-window phrase matching and phrase-list validation.
- `syntactic-templates.ts`: reusable sentence-pair and slot-template helpers.

Do not add semantic-thinness shared primitives in the first slice.

## First Rule Slice

Port these rules first:

- `em-dashes`
- `prohibited-words`
- `prohibited-phrases`
- `negation-reframe`

Reason:

- `em-dashes` proves character scanning.
- `prohibited-words` proves token matching.
- `prohibited-phrases` proves phrase data and token-window matching.
- `negation-reframe` proves sentence-pair and syntactic-pattern matching.

## Rule Locations

Use these files:

```text
src/families/orthography/em-dashes.ts
src/families/words/prohibited-words.ts
src/families/phrases/prohibited-phrases.ts
src/families/syntactic-patterns/contrast/negation-reframe.ts
```

Use JSON for large editable lists:

```text
src/families/words/data/prohibited-words.json
src/families/phrases/data/prohibited-phrases.json
```

Data shape:

```json
[
  "example"
]
```

Do not add category metadata.

## Preset

Create one preset:

```text
src/presets/everything.ts
```

The preset enables every migrated rule.

The preset must not duplicate rule implementation.

Future presets are config maps in `src/presets/`, not packages.

## Output And Evidence

Use textlint's native report mechanism.

Each finding must include:

- rule ID
- source range from textlint
- matched text in the message or data field
- short explanation

Do not rebuild the Rust JSON output in the first slice.

Build a comparator that can compare only:

- file path
- rule ID
- matched text

## Fixture Comparator

Create a fixture comparison script after the first four rules compile.

Inputs:

- existing Rust CLI output
- new textlint output
- fixture paths

Comparison scope:

- same file
- same rule ID or mapped rule ID
- matched text

Initial rule ID mapping:

## First Parity Findings

Measured on 202 existing `.md` fixtures under `fixtures/` using only:

- Rust: `prohibited-terms`, `em-dashes`, `negation-reframe`
- Textlint: `prohibited-words`, `prohibited-phrases`, `em-dashes`, `negation-reframe`

`fixtures/article1.mdx` is not covered by the current textlint run. MDX support is required before fixture parity can be claimed for the full corpus.

Observed parity:

- `em-dashes`: near parity. Rust found 134, textlint found 135. The textlint extra is a closed em dash inside Markdown link text. Decide whether orthography rules should scan link labels before changing code.
- `prohibited-terms`: textlint found more than Rust. Rust found 62, textlint found 100. This is not automatically better. The good extras are smart-quote normalized phrase hits like `it’s important to note`. The questionable extras are mostly `actually` in headings such as `what actually works` and `leverage` inside `highest-leverage`. Decide whether word/phrase rules should scan headings and link/list text.
- `negation-reframe`: no parity. Rust found 180, textlint found 548. The textlint rule is broader, not just more complete.

Negation mismatch causes:

- 201 findings from a generic second-sentence pronoun branch such as `... not ... It is ...`, including factual prose like `has not been managed well. It is marked by ...`.
- 185 findings from broad inline comma-not matching such as `data, not failure`.
- 101 findings from bare `not just`, which should not live inside `negation-reframe` as currently written.
- 27 findings from same-prefix pairs such as `The goal is not X. The goal is Y.`, which is the closest intended parity shape.
- 21 other sentence-pair findings and 13 malformed/split findings caused by textlint node boundaries or sentence extraction.

Do not trust a comparator that treats the current textlint `negation-reframe` as equivalent to Rust. The rule needs a real port of Rust matcher shapes or a documented intentional behavior change.

- Rust `prohibited-terms` single-token matches -> TypeScript `prohibited-words`
- Rust `prohibited-terms` multi-token matches -> TypeScript `prohibited-phrases`
- Rust `em-dashes` -> TypeScript `em-dashes`
- Rust `negation-reframe` -> TypeScript `negation-reframe`

## Golden Replay Fixtures

Do not use TDD-style rule behavior tests for this package.

Use replay fixtures as the behavior oracle.

Fixture layout:

```text
behavior/fixtures/textlint-rules/<family>/family.md
behavior/fixtures/textlint-rules/<family>/fixture.toml
```

Create one generated fixture document per family:

- `markdown-layout`
- `orthography`
- `metrics`
- `term-policy`
- `words`
- `phrases`
- `syntactic-patterns`
- `semantic-thinness`

Fixture document rule:

- the document is input only
- the document contains many real sentences
- each document covers trigger cases, close non-trigger cases, and recombinations for that family
- do not create one fixture per rule
- do not create Cartesian-product fixtures
- split a fixture only when one finding hides another finding

Golden output rule:

- run the accepted implementation on fixture documents
- normalize output to file path, rule ID, source range, matched text, and message
- store the normalized output as a generated baseline artifact
- do not hand-edit golden output
- behavior changes require a behavior delta before a new baseline is accepted

Replay-system checks that may remain:

- normalizer replay checks
- semantic diff replay checks
- baseline metadata fail-closed checks
- fixture schema validation checks

## Implementation Order

1. Scaffold `packages/textlint-rules`.
2. Add TypeScript config.
3. Add G3TS config and validation command.
4. Add ESLint config with regex ban.
5. Add package exports.
6. Add shared text helpers.
7. Add shared phrase matcher.
8. Add shared syntactic-template matcher.
9. Add generated family fixtures.
10. Add replay scripts.
11. Add normalizer and semantic diff.
12. Port `em-dashes`.
13. Port `prohibited-words`.
14. Port `prohibited-phrases`.
15. Port `negation-reframe`.
16. Add `everything` preset.
17. Generate the first golden baseline from the accepted implementation.
18. Run candidate replay against the baseline.
19. Record parity gaps as behavior deltas or implementation fixes.

## Definition Of Done For First Slice

- TypeScript compiles.
- ESLint passes.
- ESLint rejects direct regex use in rule source.
- G3TS passes on `packages/textlint-rules`.
- Replay fixtures exist for every family.
- Golden baseline exists for the first-slice accepted behavior.
- Candidate replay compares against the golden baseline.
- Every mismatch is classified as expected, bug, or out of first-slice scope.

## Out Of Scope For First Slice

- semantic-thinness
- readability replacement
- inclusive-language checks
- Vale integration
- full Rust deletion
- publishing package
- preserving complete Rust JSON output
