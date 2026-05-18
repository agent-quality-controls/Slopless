# Research Queue Cleanup

## Summary

Separated implemented AI-slop research from the active 2026-05-18 expansion queue. Added an implemented archive record and a remaining-candidates review that ranks the next likely Slopless implementation areas.

## Decisions Made

- Kept raw source captures in place because they are provenance, not active work.
- Archived implemented candidate groups in `legacy/source-material/expansion-2026-05-18/implemented/2026-05-18-ai-slop-gaps.md`.
- Made `legacy/source-material/expansion-2026-05-18/remaining-candidates.md` the active queue for what is still worth considering.
- Ranked next work by deterministic fit and false-positive risk: artifact placeholders first, Markdown artifacts second, transition density third, then authority, puffery, and repeated starts.

## Key Files For Context

- `.plans/2026-05-18-155850-research-queue-cleanup.md`
- `legacy/source-material/incorporation-record.md`
- `legacy/source-material/expansion-2026-05-18/implemented/2026-05-18-ai-slop-gaps.md`
- `legacy/source-material/expansion-2026-05-18/remaining-candidates.md`

## Verification

- `scripts/verify-all.sh` passed.
- `npm run spellcheck` passed.
- `npx prettier --check .plans/2026-05-18-155850-research-queue-cleanup.md legacy/source-material/incorporation-record.md legacy/source-material/expansion-2026-05-18/implemented/2026-05-18-ai-slop-gaps.md legacy/source-material/expansion-2026-05-18/remaining-candidates.md` passed.

## Next Steps

- Implement `artifact-placeholders` next if continuing the expansion queue.
