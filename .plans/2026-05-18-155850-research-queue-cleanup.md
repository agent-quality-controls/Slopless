# Research Queue Cleanup

## Goal

Make the latest research folder readable as an implementation queue again.

## Approach

- Add an implemented archive under `legacy/source-material/reviewed/implemented/`.
- Record the candidate groups exhausted by the AI-slop gap implementation with code and fixture references.
- Add a remaining-candidates review file at `legacy/source-material/reviewed/deferred/remaining-candidates.md`.
- Rank the next probable implementation areas by deterministic fit, false-positive risk, and current Slopless overlap.
- Update `legacy/source-material/reviewed/implemented/incorporation-record.md` so future sessions do not re-open already implemented AI-slop candidate groups.

## Key Decisions

- Do not delete raw source captures. They are provenance, not active work.
- Do not move partially used derived files. Several files contain both implemented and remaining candidates.
- Treat `remaining-candidates.md` as the active queue. Treat `implemented/` and the incorporation record as the archive.

## Files To Modify

- `.plans/2026-05-18-155850-research-queue-cleanup.md`
- `legacy/source-material/reviewed/implemented/incorporation-record.md`
- `legacy/source-material/reviewed/implemented/2026-05-18-ai-slop-gaps.md`
- `legacy/source-material/reviewed/deferred/remaining-candidates.md`
