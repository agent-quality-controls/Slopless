# Goal

Extend the generated slop corpus with persona-specific empty philosophical writing and mine it for semantic-thinness slots and patterns.

# Approach

1. Generate 30 additional markdown fixtures under `behavior/fixtures/textlint-rules/generated-slop-corpus/`.
2. Use persona prompts that deliberately produce empty philosophical prose:
   - pretentious yoga/wellness instructor
   - LinkedIn founder/productivity coach
   - literary/spiritual genre narrator
3. Keep files 250-450 words and slop-heavy.
4. Run semantic-thinness-only textlint on all generated corpus files.
5. Mine repeated sentence shapes and update the generated corpus report with the second-batch findings.

# Files To Modify

- `behavior/fixtures/textlint-rules/generated-slop-corpus/batch-d-*.md`
- `behavior/fixtures/textlint-rules/generated-slop-corpus/batch-e-*.md`
- `behavior/fixtures/textlint-rules/generated-slop-corpus/batch-f-*.md`
- `.plans/2026-05-13-183302-generated-slop-corpus-mining-report.md`

# Verification

- Generated corpus contains 60 markdown files.
- Semantic-thinness-only run over generated corpus completes with JSON output.
- `scripts/behavior-replay.sh behavior/fixtures/textlint-rules/no-signal/family.md` stays at zero messages.
