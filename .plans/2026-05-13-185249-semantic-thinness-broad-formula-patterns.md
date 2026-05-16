# Goal

Implement the high-confidence formula patterns mined from the 60-file generated slop corpus.

# Approach

1. Extend the local semantic-thinness matcher with pattern-level `matchMode`.
2. Keep existing full-sentence patterns as `full` matching with the current short-sentence guard.
3. Add `contains` matching for broad formula families that appear inside longer sentences.
4. Add pattern JSON files for:
   - `deictic-summary`
   - `point-is-frame`
   - `real-work-begins`
   - `something-shifted`
   - `silence-as-actor`
   - `body-knows`
   - `truth-answer-moves`
5. Update both semantic-thinness manifests to keep pattern inventory closed.
6. Run semantic-thinness over generated slop, Sunstone, and no-signal fixtures.

# Key Decisions

- Do not make giant global slots yet. Add local per-pattern slots from mined examples.
- Do not make every pattern full-sentence. Mined formulae often appear inside longer generated sentences.
- Keep matcher changes local to `families/semantic-thinness/private`.

# Files To Modify

- `packages/textlint-rules/src/families/semantic-thinness/private/pattern-matcher.ts`
- `packages/textlint-rules/src/families/semantic-thinness/private/pattern-data*.ts`
- `packages/textlint-rules/src/families/semantic-thinness/patterns/*.json`
- `.plans/2026-05-13-172644-semantic-thinness-pattern-data.md.manifest.toml`
- `.plans/2026-05-13-180323-semantic-thinness-rule.md.manifest.toml`

# Verification

- `python3 scripts/verify-semantic-thinness-pattern-manifest.py --manifest .plans/2026-05-13-172644-semantic-thinness-pattern-data.md.manifest.toml all`
- `python3 scripts/verify-semantic-thinness-rule-manifest.py --manifest .plans/2026-05-13-180323-semantic-thinness-rule.md.manifest.toml all`
- `npm run validate` in `packages/textlint-rules`
- semantic-thinness-only run over generated slop corpus
- semantic-thinness-only run over Sunstone fixtures
- no-signal fixture remains zero messages
