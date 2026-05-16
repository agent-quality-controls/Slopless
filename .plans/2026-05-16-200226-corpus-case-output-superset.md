# Goal

Make corpus behavior cover case behavior.

Running textlint on corpus should produce every rule ID produced by running textlint on cases, with possible extra corpus findings.

# Approach

1. Fix corpus placement for position-sensitive rules, starting with `false-question`.
2. Add per-corpus-file config support to `scripts/behavior-replay.sh` so corpus files can run term-policy config without applying that config to every corpus file.
3. Add a sidecar config for the corpus file that contains term-policy lines.
4. Extend `scripts/verify-corpus-preserve.py` to compare latest fixture3 received output and fail if corpus is missing any rule ID that cases produce.
5. Run fixture3, preserve verification, package validation, commit, and push.

# Files To Modify

- `scripts/behavior-replay.sh`
- `scripts/verify-corpus-preserve.py`
- `behavior/fixtures/textlint-rules/corpus/engineering-review.md`
- `behavior/fixtures/textlint-rules/corpus/metrics-and-markdown.textlintrc.json`
- `.worklogs/*corpus-case-output-superset.md`

# Key Decisions

- Exact line preservation remains the primary corpus invariant.
- Rule-ID coverage is the first mechanical behavior invariant.
- Exact per-case finding parity is stricter and should be added after rule-ID coverage is stable.
