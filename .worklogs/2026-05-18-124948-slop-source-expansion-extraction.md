# Slop Source Expansion Extraction

## Summary

Created the source-expansion extraction plan and populated a new legacy research capture under `legacy/source-material/expansion-2026-05-18/`. The capture covers academic NLP sources, prose rule libraries, AI-slop sources, and writing/revision corpora.

## Decisions Made

- Kept this as source extraction only: no product rules, fixtures, package files, or golden outputs were changed.
- Split extraction into four owned folders so source families can be reviewed independently.
- Downloaded or captured small raw source files and metadata directly, but kept huge or gated datasets as schema/sample/download notes.
- Separated high-confidence deterministic candidates from noisy or source-only candidates because many external lists overflag broad vocabulary.

## Key Files For Context

- `.plans/2026-05-18-122833-slop-source-expansion-extraction.md`
- `legacy/source-material/expansion-2026-05-18/academic-nlp/extraction-report.md`
- `legacy/source-material/expansion-2026-05-18/rule-libraries/extraction-report.md`
- `legacy/source-material/expansion-2026-05-18/ai-slop/extraction-report.md`
- `legacy/source-material/expansion-2026-05-18/writing-corpora/extraction-report.md`
- `legacy/source-material/expansion-2026-05-18/*/derived/`
- `legacy/source-material/expansion-2026-05-18/*/raw/`

## Verification

- Folder/report/raw/derived structure exists for all four extraction tracks.
- New JSON and JSONL files parse.
- `git status --short src behavior package.json package-lock.json dist .fixture3` showed no product, fixture, package, build, or fixture-output changes.
- `scripts/verify-all.sh`
- `npm run validate`

## Next Steps

- Review derived candidate files.
- Decide which candidates become Slopless rules, case fixtures, flowing corpus fixtures, or rejected/source-only notes.
- Build a second manifest for implementing the selected candidates.
