# Lead-Ins Bad Catches

Rejected findings from full-fixture corpus diffs.

## Current Status

- No rejected lead-in broadening catches recorded yet.

## 2026-05-13 Rejected Nearby Shape

This was found while broadening lead-ins and was fixed in `lesson-framing`.

- `fixtures/gpt_5_4_mini/why_people_lose_motivation_after_big_goals/article.md`: The fix is not to dream smaller in the timid, motivational-poster sense.

Reason:

- The matcher used `includes("smaller")` after `the fix is`, so it caught negated text instead of an actual `the fix is smaller/simple/plain` frame.
- The fix was to require the cue immediately after `the fix is`.
