# Goal

Mine the current fresh generated corpus for the next rule and expansion candidates after restoring adversarial no-hit controls.

# Approach

1. Run current Slopless behavior over all fresh generated text and edge-case files.
2. Measure direct-family coverage for generated hit and no-hit files.
3. Extract hit cases that do not produce direct-family findings.
4. Group misses into implementable rule candidates.
5. Reject candidates that require broad single-word bans, semantic modeling, or rules likely to create uncontrolled false positives.
6. Write a reviewed mining report under the fresh corpus analysis folder.

# Files To Modify

- `new-corpus/2026-05-19-fresh-slop-expansion/analysis/next-rule-mining.md`

# Verification

- `scripts/verify-fresh-slop-corpus.py`
- `scripts/verify-fresh-corpus-actionability.py`
- `pnpm run validate`
