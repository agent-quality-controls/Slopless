# Summary

Added a plan for the textlint-backed CLI wrapper and the post-migration prose-list enrichment pass. No implementation was done.

# Decisions Made

- Kept the future CLI as a thin wrapper around textlint, not a second runner.
- Moved the old Vale direction into a TypeScript enrichment plan: use curated data and rule ideas from `write-good`, `proselint`, `alex`, Microsoft, and Google instead of keeping Vale as the permanent architecture.
- Added a license gate before copying any external phrase/list data.
- Kept broad prose-list rules out of `general` until corpus review proves low noise.

# Key Files For Context

- `.plans/2026-05-13-042853-textlint-cli-and-prose-list-enrichment.md`
- `.plans/2026-05-12-144109-vale-write-good-proselint.md`
- `.plans/2026-05-12-152640-vale-presets.md`
- `.plans/2026-05-12-173250-textlint-full-migration-plan.md`

# Verification

- Plan-only change. No build or test run.

# Next Steps

- Start with license review for candidate `write-good` and `proselint` list data.
- Then implement one prose-list rule with full fixture diff review before adding more.
