# Goal

Enrich the fixture3 textlint corpus with realistic, long-form fixture texts.

The corpus should stop depending on one dense positive fixture. It should contain multiple article-shaped variations that reuse reviewed good and bad catches from `.plans/textlint-hit-review/`, but embed them in flowing prose.

# Approach

1. Keep the existing fixture3 suite `textlint-rules-corpus`.
2. Add positive variation fixtures grouped by rule area:
   - orthography, words, phrases
   - syntactic patterns
   - semantic thinness
3. Add mixed fixtures that combine clean prose with intended hits.
4. Add negative and clean fixtures that exercise near misses without producing messages.
5. Keep all fixtures under `behavior/fixtures/textlint-rules/corpus/`.
6. Keep source/mining fixtures separate:
   - `behavior/fixtures/textlint-rules/generated-slop-corpus/`
   - `behavior/fixtures/textlint-rules/sunstone-arden-cassia/`
7. Approve changed output with `scripts/fixture3.sh approve --suite textlint-rules-corpus`.
8. Record exact approved hit counts in the golden output.
9. Keep the fixture3 output normalizer active so new fixture files cannot reorder the JSON result between runs.

# Fixture Files

Add these files:

- `positive-product-memo-variations.md`
- `positive-wellness-essay-variations.md`
- `positive-syntactic-parenting-variations.md`
- `positive-syntactic-workplace-variations.md`
- `positive-semantic-literary-variations.md`
- `positive-semantic-reflective-variations.md`
- `positive-metrics-long-sentence-variation.md`
- `mixed-operations-slop.md`
- `mixed-wellness-slop.md`
- `negative-engineering-near-misses.md`
- `negative-product-near-misses.md`
- `clean-engineering-review.md`
- `clean-parenting-explainer.md`

Keep these existing corpus files active in the same manifest:

- `positive.md`
- `negative.md`
- `mixed.md`
- `clean.md`

# Required Fixture Roles

Positive fixtures:

- may produce findings
- must be prose-like, not a list of examples
- should include multiple rule families naturally
- should include varied sentence structure around the same detected patterns

Mixed fixtures:

- may produce findings
- must include enough clean context to expose interaction noise
- should combine several rule families in one realistic article

Negative fixtures:

- should produce zero findings
- must include close near-misses for rule families
- must avoid random trivial clean prose

Clean fixtures:

- should produce zero findings
- must be realistic full prose
- should track the noise floor

# Rule Coverage Targets

The enriched corpus should include intended coverage for:

- metrics: `avg-sentence-length`, `coleman-liau`, `flesch-kincaid`, `gunning-fog`, `paragraph-length`, `word-repetition`
- orthography: `colon-dramatic`, `em-dashes`, `exclamation-density`, `fake-timestamps`, `sentence-case`, `smart-quotes`
- words: `hedge-stacking`, `llm-vocabulary`, `prohibited-words`, `simplicity`
- phrases: `cliches`, `corporate-speak`, `humble-bragger`, `jargon-faker`, `llm-disclaimer`, `prohibited-phrases`, `skunked-terms`, `uncomparables`
- syntactic patterns: `authority-padding`, `affirmation-closers`, `boilerplate-conclusion`, `false-question`, `summative-closer`, `blame-reframe`, `contrastive-aphorism`, `negation-reframe`, `softening-language`, `universalizing-claims`, `boilerplate-framing`, `generic-signposting`, `lesson-framing`, `llm-openers`, `observer-guidance`, `response-wrapper`, `demonstrative-emphasis`, `empty-emphasis`, `fragment-stacking`, `triple-repeat`
- semantic thinness: `semantic-thinness`

# Quality Constraints

- Use sentence-case headings except where testing `sentence-case`.
- Negative and clean variation files must produce zero messages.
- Positive and mixed files must not be isolated one-line lists.
- Each new fixture should have at least 500 words unless the verifier documents a narrower exception.
- Fixture3 remains the approval source for expected output.
- Golden output order must be deterministic.
- Rule coverage must not depend on `positive.md` alone.

# Files To Modify

- `behavior/fixtures/textlint-rules/corpus/*.md`
- `behavior/golden/textlint-rules-corpus/approved.normalized.json`
- `behavior/golden/textlint-rules-corpus/approved.meta.json`
- `.plans/2026-05-13-222214-textlint-corpus-enrichment.md.manifest.toml`
- `scripts/verify-textlint-corpus-enrichment-manifest.py`
- `fixture3.yaml`
- `scripts/normalize-textlint-golden-output.py`

# Verification

Implementation is done only when these pass:

```bash
python3 scripts/verify-textlint-corpus-enrichment-manifest.py --manifest .plans/2026-05-13-222214-textlint-corpus-enrichment.md.manifest.toml all
python3 scripts/verify-textlint-corpus-fixture3-manifest.py --manifest .plans/2026-05-13-220429-textlint-corpus-fixture3.md.manifest.toml all
scripts/fixture3.sh check --suite textlint-rules-corpus
npm run validate
```
