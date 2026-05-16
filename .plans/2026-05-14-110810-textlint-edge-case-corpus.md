# Goal

Build a rigorous textlint edge-case corpus for rule design.

The existing long corpus stays as integration replay. The new edge-case corpus should make rule behavior explicit: each case has an ID, expected rules, generated fixture text, mapped output, and a report that shows expected hits, misses, wrong-rule hits, and unexpected hits.

# Approach

1. Add structured case specs under `behavior/fixtures/textlint-rules/edge-cases/*.cases.toml`.
2. Generate one markdown fixture per case under `behavior/fixtures/textlint-rules/edge-cases/generated/*.md`.
3. Generate a case map under `behavior/fixtures/textlint-rules/edge-cases/generated/case-map.json`.
4. Add a `textlint-rules-edge-cases` fixture3 suite.
5. Add a verifier that:
   - validates case spec schema,
   - verifies generated fixtures are current,
   - maps textlint messages back to case IDs,
   - checks expected rule hits,
   - reports expected misses,
   - reports unexpected hits,
   - reports wrong-rule hits,
   - writes design reports.
6. Use `scripts/fixture3.sh` so verification does not depend on interactive shell PATH.
7. Keep design reports under `behavior/reports/textlint-edge-cases/`.

# Case Spec Format

Each spec file contains `[[case]]` entries:

```toml
[[case]]
id = "negation-reframe.basic.not-x-it-is-y"
rule = "negation-reframe"
kind = "positive"
text = "This is not a delay. It is a budget decision."
expect_rules = ["negation-reframe"]
allow_extra_rules = false
notes = "Basic not-X then Y shape."
```

Allowed `kind` values:

- `positive`: should fire the listed rule or rules.
- `negative`: should fire no rules.
- `collision`: should fire multiple listed rules.
- `known-miss`: should represent a desirable future catch that currently does not fire.

# Required Spec Files

- `metrics.cases.toml`
- `orthography.cases.toml`
- `words.cases.toml`
- `phrases.cases.toml`
- `syntactic-patterns.cases.toml`
- `semantic-thinness.cases.toml`

# Required Generated Files

- `generated/case-map.json`

# Required Reports

- `feature-coverage.md`
- `expected-misses.md`
- `unexpected-hits.md`
- `wrong-rule-hits.md`

# Key Decisions

- Use structured TOML specs as the source of truth.
- Do not hide misses. `known-miss` cases are valid design evidence and should appear in the miss report.
- Do not hide unexpected co-hits. They are non-blocking design evidence and should appear in the unexpected-hit report.
- Treat wrong-rule hits as cases where an expected rule was missed while another rule fired.
- Generated markdown should be one case per file so textlint document-level rules map cleanly to a case.
- Generated markdown should use HTML case comments so the verifier can map line ranges.
- Fixture3 owns raw approved textlint output.
- The edge-case verifier owns semantic interpretation of that output.

# Files To Modify

- `fixture3.yaml`
- `behavior/fixtures/textlint-rules/edge-cases/*.cases.toml`
- `behavior/fixtures/textlint-rules/edge-cases/generated/*`
- `behavior/golden/textlint-rules-edge-cases/*`
- `behavior/reports/textlint-edge-cases/*`
- `scripts/generate-textlint-edge-cases.py`
- `scripts/verify-textlint-edge-cases.py`
- `scripts/fixture3.sh`
- `.plans/2026-05-14-110810-textlint-edge-case-corpus.md.manifest.toml`

# Verification

Implementation is done only when these pass:

```bash
python3 scripts/generate-textlint-edge-cases.py --check
python3 scripts/verify-textlint-edge-cases.py --manifest .plans/2026-05-14-110810-textlint-edge-case-corpus.md.manifest.toml all
scripts/fixture3.sh check --suite textlint-rules-edge-cases
npm run validate
```
