# Embed Vale external engine

Date: 2026-05-12 14:20

## Goal

Let `prosesmasher` run Vale as an optional external engine from the normal `check` command.

This is not a full Vale style-package product yet. It proves the integration boundary inside `prosesmasher`.

## Approach

Add a top-level config section:

```json
{
  "externalEngines": {
    "vale": {
      "enabled": true,
      "binary": "vale",
      "configPath": ".vale.ini",
      "minAlertLevel": "suggestion"
    }
  }
}
```

Behavior:

- If `enabled` is false, no Vale process runs.
- If `enabled` is true, run Vale once per checked file.
- If `configPath` is present, pass `--config <path>`.
- If `minAlertLevel` is present, pass `--minAlertLevel <value>`.
- Always pass `--output JSON`.
- Parse Vale JSON into structured external findings.
- JSON output gets an `externalEngines` array.
- Text output prints a compact external-engine section.
- Exit code is 1 when native checks fail or enabled Vale returns alerts.
- Missing or broken Vale is an operational error and returns exit code 2.

## Key Decisions

Do not merge Vale alerts into native `failures` yet.

Reason: native failures are low-expectations check results with stable IDs, expected/observed fields, and rewrite hints. Vale alerts have a different model. Merging now would force fake fields and make expected-result fixtures harder to reason about.

Keep native `evaluated`, `passed`, and `failed` counts as native counts only.

Reason: otherwise the existing schema would imply Vale alerts are native checks. The new `externalEngines` section carries its own counts.

Use process execution first.

Reason: Vale is already a CLI binary with JSON output. Embedding a Go binary or vendoring a Node downloader adds more risk than the integration needs.

## Files To Modify

- `apps/prosesmasher/crates/domain/types/runtime/src/config.rs`
- `apps/prosesmasher/crates/adapters/outbound/fs/runtime/src/config_dto.rs`
- `apps/prosesmasher/crates/adapters/inbound/cli/runtime/src/lib.rs`
- `apps/prosesmasher/crates/adapters/inbound/cli/runtime/src/output.rs`
- `apps/prosesmasher/crates/adapters/inbound/cli/runtime/src/vale.rs`
- CLI runtime tests for Vale command parsing/output mapping.
- Preset JSON files only for `full-config-en.json`; production presets stay Vale-disabled until we ship real styles.
