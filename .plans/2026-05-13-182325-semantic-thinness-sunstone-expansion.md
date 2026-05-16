# Goal

Improve the active `semantic-thinness` rule from the Sunstone fixture run.

The rule should explain what it dislikes in each finding, and it should catch the clear deterministic misses from the copied Arden and Cassia chapters.

# Approach

1. Add `purpose` and matched template to semantic-thinness rule messages.
2. Add pattern data for:
   - stock body-emotion shorthand
   - gaze choreography
   - empty atmosphere shifts
3. Keep the new pattern data local under `families/semantic-thinness/patterns`.
4. Update the manifest rows and verifier coverage so the new pattern files are part of the closed inventory.
5. Run the semantic-thinness rule on the copied Sunstone fixtures and inspect exact findings.

# Files To Modify

- `.plans/2026-05-13-172644-semantic-thinness-pattern-data.md.manifest.toml`
- `.plans/2026-05-13-180323-semantic-thinness-rule.md.manifest.toml`
- `scripts/verify-semantic-thinness-pattern-manifest.py`
- `scripts/verify-semantic-thinness-rule-manifest.py`
- `packages/textlint-rules/src/families/semantic-thinness/patterns/*.json`
- `packages/textlint-rules/src/families/semantic-thinness/private/pattern-*.ts`
- `packages/textlint-rules/src/families/semantic-thinness/semantic-thinness.ts`

# Verification

- `python3 scripts/verify-semantic-thinness-pattern-manifest.py --manifest .plans/2026-05-13-172644-semantic-thinness-pattern-data.md.manifest.toml all`
- `python3 scripts/verify-semantic-thinness-rule-manifest.py --manifest .plans/2026-05-13-180323-semantic-thinness-rule.md.manifest.toml all`
- `npm run validate` in `packages/textlint-rules`
- semantic-thinness-only textlint run over `behavior/fixtures/textlint-rules/sunstone-arden-cassia/*.md`
