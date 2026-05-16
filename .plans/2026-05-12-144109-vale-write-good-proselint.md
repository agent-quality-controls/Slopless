# Vale write-good and proselint setup

Date: 2026-05-12 14:41

## Goal

Add the two general bad-writing Vale packages, `write-good` and `proselint`, while keeping Vale independently runnable outside `prosesmasher`.

## Approach

Create a standalone Vale config tree at the repo root:

```text
vale/
  .vale.ini
  README.md
  styles/
```

The Vale config uses official Vale package management:

```ini
StylesPath = styles
MinAlertLevel = suggestion
Packages = write-good, proselint

[*.{md,mdx,txt}]
BasedOnStyles = write-good, proselint
```

Then point `prosesmasher` full config examples at `vale/.vale.ini` while keeping Vale disabled by default.

## Key Decisions

Vale rules stay in Vale.

Reason: the same setup must run with:

```bash
vale --config apps/prosesmasher/vale/.vale.ini file.md
```

`prosesmasher` only invokes Vale and parses output. It does not own individual Vale package rules.

Do not vendor synced package contents into the release surface yet.

Reason: `vale sync` can recreate `styles/` from the package list. We should discuss pinning/vendor policy separately before committing a large generated style tree.

Keep presets Vale-disabled.

Reason: enabling Vale requires the `vale` binary and synced styles. The safe default is opt-in until install and release behavior is decided.

## Files To Modify

- `vale/.vale.ini`
- `vale/README.md`
- `apps/prosesmasher/presets/full-config-en.json`
- `apps/prosesmasher/crates/adapters/outbound/fs/runtime/presets/full-config-en.json`
