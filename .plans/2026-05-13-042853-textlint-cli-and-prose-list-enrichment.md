# Goal

Plan the remaining non-Rust work after the textlint rule migration:

- add a thin `prosesmasher` CLI layer on top of textlint
- enrich TypeScript rule families with useful material from Vale package research
- do not build either part in this pass

# Source Notes Read

- `.plans/2026-05-12-144109-vale-write-good-proselint.md`
- `.plans/2026-05-12-152640-vale-presets.md`
- `.plans/2026-05-12-152640-heuristic-engine-handoff.md`
- `.plans/2026-05-12-173250-textlint-full-migration-plan.md`
- `.worklogs/2026-05-13-032408-broaden-syntactic-patterns.md`
- `.worklogs/2026-05-13-034039-syntactic-review-ledger-and-leadins.md`
- `.worklogs/2026-05-13-035606-broaden-syntactic-patterns.md`

# Current State

The migrated TypeScript rules already run through textlint.

Current runnable path:

```bash
scripts/behavior-replay.sh <file.md>
```

That script builds `@prosesmasher/textlint-rules`, runs textlint directly, loads rules from `dist/families/**`, and emits textlint JSON.

Rust is no longer needed for migrated rule execution. Rust is still present for the old user-facing CLI and for the not-yet-migrated document-policy/layout rules.

# CLI Layer Plan

Build a thin Node CLI after the current enrichment planning is settled.

Target command:

```bash
prosesmasher check article.md --format json
prosesmasher check fixtures/ --preset everything --format json
prosesmasher check article.md --rule negation-reframe --format stylish
prosesmasher --version
```

The CLI must not become a second runner.

textlint owns:

- file loading
- Markdown and MDX parsing
- rule execution
- source locations
- formatter behavior
- config loading where possible

The CLI owns only:

- command names compatible with `prosesmasher`
- preset selection
- default rule package wiring
- version output
- exit-code passthrough
- optional compatibility output later, only if needed

Implementation direction:

- add a `bin` entry to `packages/textlint-rules/package.json` or create a small sibling package if packaging requires it
- call textlint programmatically or invoke the local textlint binary
- prefer textlint built-in JSON output first
- do not preserve the old Rust JSON schema unless a consumer requires it
- keep document-policy/layout disabled until migrated

# Vale Research Decision

Do not keep Vale as the primary architecture.

Use Vale package research as input for TypeScript rule/data enrichment.

Reason:

- textlint is now the runner
- keeping Vale as a second permanent engine creates another config/output path
- the useful parts are the curated phrase lists and a few rule ideas

# Phrase Enrichment Correction

The earlier `prose-lists` family name is superseded.

Curated fixed multi-word expressions belong under `phrases`.

Purpose:

- rules backed by curated phrase lists rather than syntactic templates
- keep source lists in `src/families/phrases/data/*.json`
- keep one rule per file in `src/families/phrases/*.ts`

Candidate rules:

- `cliches`
- `corporate-speak`
- `skunked-terms`
- `uncomparables`
- `redundant-acronyms`
- `very`

Data shape:

```text
src/families/phrases/data/*.json
```

Do not put large editable lists in TypeScript files.

# Vale Package Material To Reuse

## write-good

Prior plan said useful rules were:

- `write-good.Cliches`
- `write-good.So`
- `write-good.ThereIs`

Textlint mapping:

- `write-good.Cliches` -> `phrases/cliches`
- `write-good.So` -> candidate syntactic-pattern lead-in rule only if corpus review proves value
- `write-good.ThereIs` -> candidate syntactic-pattern lead-in rule only if corpus review proves value

Do not port full write-good behavior blindly.

Reason:

- broad passive/weasel/wordy rules are harsh-preset material at most
- existing syntactic rules are more precise than generic write-good checks

## proselint

Prior plan listed useful material:

- cliches
- corporate-speak
- skunked terms
- uncomparables
- AM/PM date patterns
- `very`
- maybe RAS syndrome

Textlint mapping:

- cliches -> `phrases/cliches`
- corporate-speak -> `phrases/corporate-speak`
- skunked terms -> `phrases/skunked-terms`
- uncomparables -> `phrases/uncomparables`
- AM/PM date patterns -> `orthography` only if it does not conflict with `fake-timestamps`
- `very` -> `words/very`, decide after reviewing rule behavior
- RAS syndrome -> `phrases/redundant-acronyms`

Do not port:

- full proselint architecture
- Typography
- paragraph-start `But`
- giant substitution lists without corpus evidence

## alex

Prior plan said `alex` is inclusive-language linting, not slop detection.

Potential TypeScript mapping:

- future `inclusive-language` family or preset
- not part of `general`
- not part of the slop detector

Candidate enabled classes from prior plan:

- likely profanity
- suicide
- gendered
- race
- LGBTQ
- press
- OCD
- maybe ablist

Rejected from prior plan:

- condescending
- profanity maybe
- profanity unlikely

Reason:

- they overflag ordinary prose such as `easy`

## Microsoft and Google

Do not port full packages.

Possible harsh-only ideas:

- adverb pressure from Microsoft
- ellipsis pressure from Microsoft or Google

Rejected:

- contractions
- first person
- `we`
- broad em-dash rules
- heading rules
- domain-specific word lists

Reason:

- they duplicate existing rules or impose technical-doc style on essays/posts

# License Gate

Before copying any list or rule data:

1. Find the source repository and exact license for the package/list.
2. Verify that copying curated data into this repository is allowed.
3. Record attribution requirements in the rule data folder.
4. If copying is not clean, either depend on an external package or write a smaller original list.

No list from Vale packages should be copied before this gate.

# Review Workflow

For every new prose-list rule:

1. Add the candidate list.
2. Run textlint on all fixture markdown files.
3. Save before/after JSON.
4. Split new findings into accepted and rejected examples.
5. Keep the rule only if accepted findings dominate for its target preset.
6. Add behavior fixture positives and no-signal negatives.
7. Regenerate behavior baseline.

Use the same review-ledger structure as syntactic patterns:

```text
.plans/textlint-prose-lists/
  cliches-good-catches.md
  cliches-bad-catches.md
  corporate-speak-good-catches.md
  corporate-speak-bad-catches.md
```

# Preset Placement

Initial placement:

- `everything`: all new rules, for development
- `harsh`: cliches, corporate-speak, very, adverb pressure, ellipsis pressure if accepted
- `general`: only low-noise rules after corpus review
- `inclusive`: alex-derived rules only after separate review

Do not add broad prose-list rules to `general` by default.

# Files Expected Later

CLI:

- `packages/textlint-rules/src/cli.ts` or sibling CLI package
- `packages/textlint-rules/package.json`
- behavior fixture for CLI smoke output

Prose-list enrichment:

- `packages/textlint-rules/src/families/prose-lists/*.ts`
- `packages/textlint-rules/src/families/prose-lists/data/*.json`
- `packages/textlint-rules/src/registries/prose-lists.ts`
- `packages/textlint-rules/src/presets/everything.ts`
- `behavior/fixtures/textlint-rules/prose-lists/family.md`
- `behavior/baselines/textlint-rules/prose-lists.json`
- `.plans/textlint-prose-lists/*.md`

# Out Of Scope For This Plan

- implementing the CLI
- migrating document-policy/layout
- keeping Vale as a permanent external engine
- adding technical-docs or jobs presets
- building semantic-thinness rules
