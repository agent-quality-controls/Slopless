# Summary

Renamed phrase migration artifacts that were previously labeled by their Rust source crate. The TypeScript ownership is now clearer: `humble-bragger` and `jargon-faker` live in `phrases`; `persona-signals` is only the Rust source provenance.

# Decisions Made

- Kept Rust provenance in the filenames as `rust-persona-source` because it explains which Rust checks were compared.
- Removed wording that implied TypeScript has a `persona-signals` family.
- Did not amend the previous commit because the repo rule says not to amend unless explicitly requested.

# Key Files

- `.plans/2026-05-13-002825-migrate-rust-persona-signals-into-phrases.md`
- `.plans/2026-05-13-003341-phrases-rust-persona-source-good-catches.md`
- `.plans/2026-05-13-003341-phrases-rust-persona-source-textlint-diff.md`
- `.worklogs/2026-05-13-003507-migrate-rust-persona-signals-into-phrases.md`

# Next Steps

- Continue with the next TypeScript taxonomy family migration.
