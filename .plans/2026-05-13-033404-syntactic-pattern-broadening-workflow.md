# Goal

Broaden existing `syntactic-patterns` rules without adding new families, while keeping review evidence mechanically tied to full-fixture corpus runs.

# Scope

In scope:

- `syntactic-patterns/lead-ins`
- `syntactic-patterns/closers`
- `syntactic-patterns/authority`
- `syntactic-patterns/generalization`
- `syntactic-patterns/repetition`
- `syntactic-patterns/contrast`
- `syntactic-patterns/llm-artifacts`

Out of scope:

- `semantic-thinness`
- `markdown-layout`
- `orthography`
- `metrics`
- `term-policy`
- new presets

# Evidence Layout

New review files live in `.plans/textlint-syntactic-patterns/`.

For each subfamily:

- `<subfamily>-good-catches.md`: accepted findings from full-fixture corpus diffs.
- `<subfamily>-bad-catches.md`: rejected broadening findings and the reason they were rejected.

Historical evidence remains in place. The new folder becomes the active review ledger from this point forward.

# Broadening Order

1. `lead-ins`
   - Broaden `boilerplate-framing`, `lesson-framing`, and `observer-guidance`.
   - Keep `generic-signposting` from the previous pass unless new corpus evidence shows gaps.
2. `closers`
   - Broaden `affirmation-closers`, `summative-closer`, and `false-question`.
   - Keep tail-position and short-form constraints.
3. `authority`
   - Continue subject/predicate broadening only when the claim is citation theater rather than concrete evidence.
4. `generalization`
   - Keep stacked-signal requirement.
   - Do not re-add `can`, `often`, `tends to`, or `for some people` as broad signals.
5. `repetition`
   - Broaden only by sentence skeletons after a separate corpus diff.
6. `contrast`
   - Treat `negation-reframe` as already broad. Add only specific missing construction classes.
7. `llm-artifacts`
   - Mostly exact assistant leakage. Do not broaden unless corpus shows missed wrappers.

# Full-Fixture Testing Loop

For each pass:

1. Run current textlint syntactic-pattern rules over all non-prompt fixture `.md` and `.mdx` files.
2. Save JSON output to `/tmp/prosesmasher-syntactic-before.json`.
3. Apply one broadening slice.
4. Rebuild the textlint package.
5. Run the same fixture corpus to `/tmp/prosesmasher-syntactic-after.json`.
6. Diff by file, rule, line, and column.
7. Append accepted examples to the subfamily good-catches file.
8. Append rejected examples to the subfamily bad-catches file.
9. Keep code only if the new good catches clearly dominate and bad catches are removed.

# Files Expected To Change

- `.plans/textlint-syntactic-patterns/*.md`
- `packages/textlint-rules/src/families/syntactic-patterns/**`
- `behavior/fixtures/textlint-rules/syntactic-patterns/family.md`
- `behavior/fixtures/textlint-rules/syntactic-patterns/fixture.toml`
- `behavior/baselines/textlint-rules/syntactic-patterns.json`
