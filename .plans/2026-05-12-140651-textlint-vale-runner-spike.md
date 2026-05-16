# Textlint/Vale runner spike

Date: 2026-05-12 14:06

## Goal

Decide whether `prosesmasher` should keep its Rust runner and embed Vale, or migrate orchestration to textlint and expose Vale plus `prosesmasher` checks as textlint rules.

Vale is in scope either way. The question is not whether to use Vale. The question is where Vale runs.

## Fixed Decision

Use Vale for imported style-guide rules.

Reasons:

- Vale has a mature prose-style rule ecosystem.
- Vale is a standalone binary with JSON output.
- Vale covers external editorial rules we should not reimplement.
- Vale can be used from either Rust or textlint without changing its rule definitions.

## Option A: Rust runner keeps ownership

Shape:

```text
prosesmasher CLI
  - runs native Rust checks
  - runs Vale as an external process
  - normalizes Vale JSON into prosesmasher output
```

Advantages:

- One binary remains the product surface.
- Existing fixtures and expected files stay primary.
- Current rule families stay in Rust.
- No Node dependency for users.

Costs:

- We keep maintaining runner features: config, suppression, formatting, file traversal, markdown/range handling.
- We must build a Vale adapter and normalized external-engine output.
- We still own editor/CI integration if we want it polished.

## Option B: textlint becomes the runner

Shape:

```text
textlint CLI
  - @websmasher/textlint-rule-vale runs Vale once per file
  - @websmasher/textlint-rule-prosesmasher runs current Rust CLI during migration
  - @websmasher/textlint-rule-slop ports native checks over time
```

Advantages:

- textlint owns runner concerns: config loading, plugins, suppression comments, formatters, editor integrations, CI output.
- Our product becomes a rule preset rather than a full runner.
- Vale can be bridged as one async textlint rule.
- Migration can be incremental by wrapping the current Rust CLI first.

Costs:

- Node becomes the primary runtime.
- We still maintain custom slop rules.
- We must verify textlint can represent our evidence and source ranges cleanly.
- Cross-sentence checks may be awkward if textlint AST access fights our current document model.

## Spike

Build a minimal local textlint workspace that proves or disproves the runner path.

Steps:

1. Create local spike files outside the release surface.
2. Install textlint and a Vale binary provider if needed.
3. Add a textlint rule that runs Vale once per file and re-reports Vale findings.
4. Add a textlint rule that runs the existing `prosesmasher` CLI once per file and re-reports its JSON findings.
5. Run the spike on a small fixture subset.
6. Compare output quality, location mapping, speed, and config friction.

## Pass Criteria

textlint is a credible runner only if all are true:

- The Vale bridge reports clear textlint findings with correct file, line, and column.
- The `prosesmasher` bridge reports current findings without losing rule IDs or evidence.
- The textlint JSON output is rich enough for our expected-result fixture workflow.
- External tools run once per file, not once per sentence or AST node.
- The setup can be packaged as npm rules/presets without repo-specific paths.

## Fail Criteria

Keep `prosesmasher` as runner if any are true:

- Location mapping is brittle.
- External finding evidence cannot be represented without losing too much detail.
- textlint suppression or duplicate-message behavior hides findings we need.
- Running wrapped external tools through textlint creates material slowdown or noisy failure modes.
- Cross-sentence checks would need a second custom document model inside textlint.

## Files To Modify

Expected spike-only files:

- `.plans/2026-05-12-140651-textlint-vale-runner-spike.md`
- `spikes/textlint-runner/package.json`
- `spikes/textlint-runner/.textlintrc.cjs`
- `spikes/textlint-runner/rules/vale-bridge.cjs`
- `spikes/textlint-runner/rules/prosesmasher-bridge.cjs`
- `spikes/textlint-runner/run-spike.sh`

No release files should change during this spike.
