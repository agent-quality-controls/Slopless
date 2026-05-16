# Summary

Added an architecture plan for `goldencheck`, a reusable Rust CLI for fixture-based golden output checks.

The plan defines the manifest shape, command surface, metadata model, fail-closed behavior, storage layout, and first integration target using the current textlint behavior fixtures.

# Decisions Made

- Chose `goldencheck` as the tool name because it maps clearly to golden-file checking.
- Used `run_commit` in metadata instead of `accepted_commit` because each output only knows where it was generated.
- Kept project behavior in configured commands and optional normalizers.
- Kept the CLI responsible for deterministic fixture discovery, command execution, metadata, diffs, and accept gating.

# Key Files For Context

- `.plans/2026-05-13-150929-goldencheck-architecture.md`
- `/Users/tartakovsky/Projects/kb/.plans/2026-05-12-165330-behavior-replay-golden-baselines.md`
- `scripts/behavior-replay.sh`
- `scripts/behavior-diff.sh`
- `behavior/fixtures/textlint-rules/`
- `behavior/baselines/textlint-rules/`

# Verification

- Plan-only change. No build or replay command was needed.

# Next Steps

- Decide whether to prototype `goldencheck` inside this repo under a separate crate or start a standalone repository.
- First implementation slice should reproduce `scripts/behavior-verify.sh` behavior for `textlint-rules`, then add metadata and accept gating.
