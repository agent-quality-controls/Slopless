# Textlint Full Migration Plan

Date: 2026-05-12 17:32

## Decision

Migrate `prosesmasher` fully to TypeScript on top of textlint.

The target architecture is:

- textlint owns runner behavior
- textlint owns Markdown parsing and source locations
- textlint owns rule loading, presets, config, formatter integration, and file traversal
- `prosesmasher` owns only rule families, rule data, preset bundles, and compatibility wrappers where needed

We should not preserve Rust runner semantics if textlint already has a concept for the same job.

## Goal

Delete the Rust runner/parser/config/output surface by moving to textlint and rebuilding `prosesmasher` as a set of isolated textlint rule packages and presets.

The migration must preserve useful existing detection behavior before deleting the Rust implementation.

## Non-Goals

- Do not build a second textlint-like runner.
- Do not keep Rust via WASM unless a later rule needs Rust-only NLP or performance.
- Do not port Vale itself.
- Do not port Proselint architecture.
- Do not carry the Rust `Document` model unless a rule explicitly needs an equivalent input model.
- Do not preserve output schema if textlint's output is good enough. Add a formatter only for specific consumer needs.

## Core Architectural Rule

Every family must be independently owned.

No cross-family shared mutable registry. No central match-everything file. No one package importing another package's internals.

Allowed sharing:

- tiny public utility package for text normalization, sentence windows, and source range mapping
- shared test helpers
- shared fixture comparator

Forbidden sharing:

- importing private matchers from another family
- one mega-rule with many unrelated checks
- one central list of all phrase patterns
- custom runner state hidden outside textlint

## Package Shape

Use a TypeScript workspace.

Proposed packages:

```text
packages/
  textlint-rule-prosesmasher-style-signals/
  textlint-rule-prosesmasher-lexical/
  textlint-rule-prosesmasher-flow/
  textlint-rule-prosesmasher-cadence-patterns/
  textlint-rule-prosesmasher-rhetorical-framing/
  textlint-rule-prosesmasher-persona-signals/
  textlint-rule-prosesmasher-llm-slop/
  textlint-rule-prosesmasher-prose-lists/
  textlint-rule-prosesmasher-readability/
  textlint-rule-prosesmasher-document-policy/
  textlint-preset-prosesmasher-general/
  textlint-preset-prosesmasher-harsh/
  textlint-preset-prosesmasher-inclusive/
  textlint-preset-prosesmasher-all/
  prosesmasher-textlint-utils/
  prosesmasher-fixture-compare/
```

If textlint presets can comfortably reference individual rules inside one package, we can reduce package count. But the ownership boundary should remain family-level in source layout.

## Runner Boundary

textlint owns:

- file discovery
- Markdown parsing
- AST traversal
- source locations
- config loading
- plugin loading
- formatter output
- rule enable/disable behavior

`prosesmasher` owns:

- rule definitions
- rule messages
- rule-specific evidence in messages or metadata
- package presets
- fixture parity tests
- curated data from Vale/Proselint/write-good/alex where license permits

## Rule Family Mapping

### Style Signals

Rust source:

- `apps/prosesmasher/crates/app/checks/style-signals/runtime`

Textlint package:

- `textlint-rule-prosesmasher-style-signals`

Rules:

- `em-dashes`
- `sentence-case`
- `smart-quotes`
- `exclamation-density`
- `fake-timestamps`
- `colon-dramatic`

Migration notes:

- `em-dashes`: use our policy, not Google/Microsoft. Catch closed em dash `[^\\s]—[^\\s]`.
- `sentence-case`: textlint heading nodes should make this cleaner than Rust.
- `smart-quotes`: simple existence rule.
- `exclamation-density`: paragraph-level counting.
- `colon-dramatic`: currently disabled by default due false positives. Keep disabled or omit from general.

### Lexical

Rust source:

- `apps/prosesmasher/crates/app/checks/lexical/runtime`

Textlint package:

- `textlint-rule-prosesmasher-lexical`

Rules:

- `prohibited-terms`
- `hedge-stacking`
- `simplicity`
- `required-terms`
- `recommended-terms`

Migration notes:

- These are straightforward text/paragraph rules.
- Preserve override-list config only if still useful; otherwise use textlint rule options.
- `required-terms` and `recommended-terms` may belong in a separate SEO/policy preset, not default slop checking.

### Flow

Rust source:

- `apps/prosesmasher/crates/app/checks/flow/runtime`

Textlint package:

- `textlint-rule-prosesmasher-flow`

Rules:

- `paragraph-length`
- `word-repetition`

Migration notes:

- Paragraph length maps naturally to paragraph nodes.
- Word repetition can use token utilities.

### Readability

Rust source:

- `apps/prosesmasher/crates/app/checks/readability/runtime`

Textlint package:

- Prefer existing textlint/retext readability package if good enough.
- Otherwise `textlint-rule-prosesmasher-readability`.

Rules to replace:

- `flesch-kincaid`
- `gunning-fog`
- `coleman-liau`
- `avg-sentence-length`

Migration notes:

- Do not port Rust formulas if a maintained textlint/retext package covers them.
- Existing Vale Readability was stricter than native and caught everything native caught in sampled fixtures.
- Native `avg-sentence-length` can be dropped if readability package covers sentence length pressure well enough.

### Document Policy

Rust source:

- `apps/prosesmasher/crates/app/checks/document-policy/runtime`

Textlint package:

- `textlint-rule-prosesmasher-document-policy`

Rules:

- `word-count`
- `heading-hierarchy`
- `heading-counts`
- `bold-density`
- `code-fences`

Migration notes:

- These map naturally to Markdown AST.
- Some may be better as preset-specific policy rather than prose quality.
- Keep only if consumers still use article/email/substack structural modes.

### Cadence Patterns

Rust source:

- `apps/prosesmasher/crates/app/checks/cadence-patterns/runtime`

Textlint package:

- `textlint-rule-prosesmasher-cadence-patterns`

Rules:

- `negation-reframe`
- `fragment-stacking`
- `triple-repeat`
- `demonstrative-emphasis`

Migration notes:

- This is one of the hard packages.
- Needs shared sentence-window utilities.
- `negation-reframe` must be ported carefully with fixture parity.
- Do not make this package depend on `llm-slop`.

### Rhetorical Framing

Rust source:

- `apps/prosesmasher/crates/app/checks/rhetorical-framing/runtime`

Textlint package:

- `textlint-rule-prosesmasher-rhetorical-framing`

Rules:

- `llm-openers`
- `affirmation-closers`
- `summative-closer`
- `false-question`

Migration notes:

- Mostly phrase/pattern rules.
- Good early port candidate after style/lexical.

### Persona Signals

Rust source:

- `apps/prosesmasher/crates/app/checks/persona-signals/runtime`

Textlint package:

- `textlint-rule-prosesmasher-persona-signals`

Rules:

- `humble-bragger`
- `jargon-faker`

Migration notes:

- Small package.
- Good early port candidate.

### LLM Slop

Rust source:

- `apps/prosesmasher/crates/app/checks/llm-slop/runtime`

Textlint package:

- `textlint-rule-prosesmasher-llm-slop`

Rules:

- `llm-disclaimer`
- `response-wrapper`
- `generic-signposting`
- `boilerplate-framing`
- `llm-vocabulary`
- `softening-language`
- `universalizing-claims`
- `boilerplate-conclusion`
- `empty-emphasis`
- `contrastive-aphorism`
- `blame-reframe`
- `authority-padding`
- `lesson-framing`
- `observer-guidance`

Migration notes:

- This is the largest custom-value package.
- Port only after utilities and fixture compare are working.
- Keep rule IDs stable.
- Preserve current family split internally.
- Do not add new heuristic behavior during parity port unless explicitly planned.

### Prose Lists From Vale/Proselint/write-good/alex

Textlint package:

- `textlint-rule-prosesmasher-prose-lists`

Sources:

- selected Proselint lists
- selected write-good behavior if existing textlint package is not good enough
- selected alex behavior if existing textlint package is not good enough

Useful Proselint data:

- cliches
- corporate-speak
- skunked terms
- uncomparables
- AM/PM date patterns
- `very`
- maybe RAS syndrome

Do not port:

- full Proselint architecture
- `Typography`
- paragraph-start `But`
- giant substitution lists unless we actually want them

License gate:

- Before copying lists, verify license compatibility.
- If license is not suitable, use an external package or write our own smaller list.

## Shared Utility Package

Package:

- `prosesmasher-textlint-utils`

Allowed responsibilities:

- normalize text
- strip quoted segments
- tokenize words
- sentence split
- paragraph sentence windows
- map offsets to textlint report locations if needed
- common test fixture loading

Forbidden responsibilities:

- owning rule data
- knowing every rule ID
- running rules
- doing family-specific matching

Candidate dependencies:

- start with minimal custom utilities
- add `wink-nlp` only when a rule needs POS, lemmas, or stronger sentence splitting
- avoid heavy NLP by default

## Preset Packages

### General

Package:

- `textlint-preset-prosesmasher-general`

Goal:

- Low false positives.

Likely includes:

- stable style signals
- stable LLM slop rules
- stable cadence rules
- curated prose-list rules with low noise

Likely excludes:

- colon-dramatic
- harsh readability thresholds
- noisy passive/too-wordy/weasel
- broad cliche dictionary unless accepted
- scene-filler harsh rules

### Harsh

Package:

- `textlint-preset-prosesmasher-harsh`

Goal:

- Rewrite pressure. False positives are allowed when rewritten text usually improves.

Likely includes:

- all general rules
- broad write-good-style rules
- readability pressure
- cliches
- maybe passive/wordiness/weasel
- future scene-filler/metaphorized-abstract rules

### Inclusive

Package:

- `textlint-preset-prosesmasher-inclusive`

Goal:

- Sensitivity language linting.

Likely includes:

- curated alex/equality rules
- no noisy maybe/unlikely profanity classes unless explicitly enabled

### All

Package:

- `textlint-preset-prosesmasher-all`

Goal:

- Development and testing.

Includes every rule, even disabled-by-default rules.

## Output Strategy

Default output:

- use textlint's built-in JSON formatter

Optional later package:

- `textlint-formatter-prosesmasher`

Only build this if a consumer needs the old schema:

- `rewrite_needed`
- `rewrite_brief`
- `failures[].evidence`
- sidecar parity output

Do not block migration on preserving the old JSON schema.

## Fixture Parity Strategy

Existing fixtures:

- `fixtures/**/*.md`
- `fixtures/**/*.mdx`
- `fixtures/*.expected.general-en.json`
- `fixtures/medicaloutline/*.expected.general-en.json`

Build a comparator before deleting Rust rules.

Comparator package:

- `prosesmasher-fixture-compare`

Inputs:

- Rust CLI JSON output
- textlint JSON output
- fixture sidecars

Reports:

- lost expected findings
- new findings
- rule-by-rule counts
- evidence snippets
- files with changed status

Parity rule:

- General preset must not lose existing expected failures unless a rule is intentionally removed or narrowed.
- New general findings require manual review.
- Harsh preset may add findings if they are rewrite-useful.

## Migration Phases

### Phase 0: Freeze Current Rust Baseline

Tasks:

- Run Rust CLI across fixtures.
- Save baseline JSON artifacts.
- Record current sidecar expectations.
- Mark known flaky/hanging files.

Done when:

- baseline can be compared by script
- no migration starts from memory

### Phase 1: Create TypeScript Workspace

Tasks:

- add package manager config
- add textlint dependency
- add TypeScript build/test setup
- add one empty preset
- add fixture comparator skeleton

Done when:

- `pnpm test` or equivalent runs
- textlint can lint one fixture with no rules

### Phase 2: Port Easy Rules

Port:

- smart quotes
- closed em-dash
- exclamation density
- fake timestamps
- llm disclaimer
- very
- corporate-speak
- skunked
- date AM/PM

Done when:

- unit tests pass
- fixture comparator shows expected hits

### Phase 3: Replace Readability

Tasks:

- choose maintained readability plugin or retext package
- configure thresholds for general/harsh
- compare against Rust readability where it matters

Done when:

- native readability can be deleted or disabled in migration branch

### Phase 4: Port Medium Rules

Port:

- lexical rules
- flow rules
- document policy rules
- rhetorical framing
- persona signals
- boilerplate framing
- generic signposting
- authority padding

Done when:

- family-level parity is acceptable

### Phase 5: Port Hard Rules

Port:

- negation-reframe
- contrastive-aphorism
- empty-emphasis
- universalizing claims
- softening language
- response-wrapper
- blame-reframe

Done when:

- every synthetic positive/negative is ported
- fixture sidecars still pass
- rule outputs are reviewed

### Phase 6: Switch CLI Surface

Options:

- expose `prosesmasher` as a Node CLI that wraps textlint
- expose only textlint presets and rules, no separate CLI

Preferred:

- start with textlint presets only
- add a wrapper CLI only if needed for compatibility or cargo-binstall replacement

Done when:

- local users can run a documented command on fixtures
- CI uses textlint path

### Phase 7: Delete Rust Runner

Delete only after parity:

- parser crates
- config loader crates
- CLI runtime
- core check runner
- Rust readability
- Rust rules that have textlint parity

Keep temporarily:

- Rust release/package files until new distribution path is complete
- historical fixtures
- plans/worklogs

## Risk Register

### Textlint AST Is Not Our Document Model

Impact:

- sentence-window rules need a utility layer

Mitigation:

- build `prosesmasher-textlint-utils`
- test sentence splitting heavily

### Evidence Becomes Weaker

Impact:

- rewrite agents may lose structured evidence

Mitigation:

- encode evidence in rule messages or rule metadata where possible
- add formatter later only if needed

### Rule Port Drift

Impact:

- TypeScript rule behavior differs from Rust without noticing

Mitigation:

- fixture comparator before porting hard rules
- port synthetic tests family by family

### Package Sprawl

Impact:

- many tiny packages become annoying

Mitigation:

- source can be family-split while published package count is lower
- keep ownership boundaries in directories if packages are merged

### External Lists License Risk

Impact:

- cannot vendor Proselint/write-good/alex data

Mitigation:

- verify licenses before copying
- depend on upstream package when license is unclear
- write smaller owned lists where needed

## Decision Checks Before Implementation

Answer these before coding:

1. Do we publish many textlint packages or one `textlint-rule-prosesmasher` package with many rule IDs?
2. Do we keep a `prosesmasher` wrapper CLI or just ship textlint presets?
3. Do we require old JSON output compatibility?
4. Which package manager: `pnpm`, `npm`, or existing repo standard?
5. Which rules belong in `general` versus `harsh` after migration?

## Current Best Recommendation

Use one published rule package and multiple preset packages at first:

```text
@prosesmasher/textlint-rule
@prosesmasher/textlint-preset-general
@prosesmasher/textlint-preset-harsh
@prosesmasher/textlint-preset-inclusive
```

Inside `@prosesmasher/textlint-rule`, keep source directories split by family:

```text
src/rules/style-signals/
src/rules/lexical/
src/rules/cadence-patterns/
src/rules/rhetorical-framing/
src/rules/persona-signals/
src/rules/llm-slop/
src/rules/prose-lists/
src/utils/
```

Reason:

- fewer packages to publish
- still clear ownership boundaries
- textlint still loads independent rule IDs
- migration stays simpler

Split into separate published packages only if package size or ownership requires it later.
