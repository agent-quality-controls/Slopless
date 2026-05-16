# Goal

Create one review-ledger folder for textlint rule hits and add semantic-thinness findings from the active fixtures.

# Approach

1. Inventory existing `*-good-catches.md` and `*-bad-catches.md` files under `.plans`.
2. Create `.plans/textlint-hit-review/` as the central index folder.
3. Move existing ledgers into `.plans/textlint-hit-review/` so review files live in one folder.
4. Add semantic-thinness review files:
   - `.plans/textlint-hit-review/semantic-thinness-good-catches.md`
   - `.plans/textlint-hit-review/semantic-thinness-bad-catches.md`
5. Generate current semantic-thinness findings from:
   - `behavior/fixtures/textlint-rules/semantic-thinness/family.md`
   - `behavior/fixtures/textlint-rules/generated-slop-corpus/*.md`
   - `behavior/fixtures/textlint-rules/sunstone-arden-cassia/*.md`
   - `behavior/fixtures/textlint-rules/no-signal/family.md`
6. Sort findings into good and bad based on whether the matched text is actually a low-information semantic-thinness signal.

# Key Decisions

- Move old ledger files into the central folder. The user explicitly wanted direct files instead of symlinks.
- Treat `generated-slop-corpus` and `sunstone-arden-cassia` as semantic-thinness review fixtures because they have semantic-thinness-only configs.
- Keep the generated report as Markdown, not JSON, because this is a manual review ledger.

# Files To Modify

- `.plans/textlint-hit-review/index.md`
- `.plans/textlint-hit-review/semantic-thinness-good-catches.md`
- `.plans/textlint-hit-review/semantic-thinness-bad-catches.md`
