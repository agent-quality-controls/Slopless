# Goal

Move textlint behavior fixtures to a smaller, reviewed corpus that is checked by `fixture3`.

The final state should have fewer fixture files with larger, structured content. Review ledgers remain under `.plans/textlint-hit-review/`. Fixture files remain under `behavior/fixtures/textlint-rules/`.

# Approach

1. Add a `fixture3.yaml` suite named `textlint-rules-corpus`.
2. Add a corpus fixture folder:
   - `behavior/fixtures/textlint-rules/corpus/positive.md`
   - `behavior/fixtures/textlint-rules/corpus/negative.md`
   - `behavior/fixtures/textlint-rules/corpus/mixed.md`
   - `behavior/fixtures/textlint-rules/corpus/clean.md`
3. Keep source and mining fixtures separate:
   - `behavior/fixtures/textlint-rules/generated-slop-corpus/`
   - `behavior/fixtures/textlint-rules/sunstone-arden-cassia/`
4. Generate `positive.md` from reviewed good-catch ledgers.
5. Generate `negative.md` from reviewed bad-catch ledgers and extra near-miss negatives.
6. Use `mixed.md` for article-shaped interactions across families.
7. Use `clean.md` as a low-noise full-prose fixture.
8. Store approved fixture3 output under:
   - `behavior/golden/textlint-rules-corpus/approved.normalized.json`
   - `behavior/golden/textlint-rules-corpus/approved.meta.json`
9. Normalize textlint JSON by sorting file results and messages before golden comparison.
10. Store latest received and diff output under:
   - `.fixture3/textlint-rules-corpus/`
11. Retire the permanent baseline workflow after fixture3 approval is in place:
   - `behavior/baselines/textlint-rules/`
   - `scripts/behavior-baseline.sh`
   - `scripts/behavior-diff.sh`
   - `scripts/behavior-verify.sh`
   - `scripts/behavior-accept.sh`

# Key Decisions

- Use `fixture3` as the only long-term fixture runner for textlint behavior.
- Do not make one small fixture per rule. Use fewer large fixtures with headings.
- Do not move generated/source fixtures into the reviewed corpus. They stay separate as mining sources.
- Do not encode expected counts in fixture TOML. Fixture3 owns full JSON output approval.
- Keep `.plans/textlint-hit-review/` as the human review ledger and use it to build fixture content.
- Keep `scripts/behavior-replay.sh` as the project command that fixture3 runs.
- Keep `scripts/normalize-textlint-golden-output.py` as the fixture3 output normalizer so fixture discovery order cannot change approved output.

# Corpus Files

## `positive.md`

Dense accepted findings. Each section is grouped by family and rule.

Purpose:

- protect known good catches
- make it easy to add new reviewed positives
- produce stable output for approved JSON

## `negative.md`

Dense near-misses that should stay quiet.

Purpose:

- protect against false positives
- include close shapes, not random clean prose
- include semantic and syntactic negatives from bad-catch ledgers

## `mixed.md`

Long article-style fixture with both intended hits and clean context.

Purpose:

- catch interaction bugs across rules
- reveal overmatching in realistic paragraphs
- make sure paragraph and sentence traversal still behaves under real article structure

## `clean.md`

Long clean prose fixture.

Purpose:

- track noise floor
- catch broad matchers that fire on ordinary prose
- stay mostly or fully quiet

# Files To Add

- `fixture3.yaml`
- `behavior/fixtures/textlint-rules/corpus/positive.md`
- `behavior/fixtures/textlint-rules/corpus/negative.md`
- `behavior/fixtures/textlint-rules/corpus/mixed.md`
- `behavior/fixtures/textlint-rules/corpus/clean.md`
- `behavior/golden/textlint-rules-corpus/approved.normalized.json`
- `behavior/golden/textlint-rules-corpus/approved.meta.json`
- `scripts/normalize-textlint-golden-output.py`
- `scripts/verify-textlint-corpus-fixture3-manifest.py`

# Files To Keep

- `scripts/behavior-replay.sh`
- `.plans/textlint-hit-review/`
- `behavior/fixtures/textlint-rules/generated-slop-corpus/`
- `behavior/fixtures/textlint-rules/sunstone-arden-cassia/`

# Files To Retire After Approval

- `behavior/baselines/textlint-rules/`
- `scripts/behavior-baseline.sh`
- `scripts/behavior-diff.sh`
- `scripts/behavior-verify.sh`
- `scripts/behavior-accept.sh`

# Verification

Implementation is done only when these pass:

```bash
python3 scripts/verify-textlint-corpus-fixture3-manifest.py --manifest .plans/2026-05-13-220429-textlint-corpus-fixture3.md.manifest.toml all
scripts/fixture3.sh check --suite textlint-rules-corpus
npm run validate --workspace packages/textlint-rules
```

# Next Fixture Generation Pass

The first fixture3 corpus is allowed to be dense because it proves the runner and approval path.

The next pass should generate realistic fixture texts from the reviewed cases:

- use good-catch ledger lines as required ingredients
- use bad-catch ledger lines as near-miss constraints
- generate article-shaped prose around those ingredients
- keep each generated fixture large enough to review as prose, not as a list of isolated examples
- keep `positive.md`, `negative.md`, `mixed.md`, and `clean.md` as the stable fixture3 entry points
- approve the changed output through `scripts/fixture3.sh approve`
