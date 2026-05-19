# Goal

Widen high-value slop detection without repeating the previous false-positive cycle. Add no-hit edge cases first, then broaden rules against those controls.

# Approach

1. Add no-hit edge cases:
   - semantic thinness: concrete deictic summaries, literal body states, medical body causes, caused atmosphere changes, real object pointers
   - syntactic patterns: ordinary entity evaluations, concrete operational summaries, direct evidence summaries, literal contrast pairs
   - narrative slop: purposeful movement, clinical/body facts, staged performance voice/breath/smile cases
2. Widen rules:
   - semantic thinness: expand deictic summary, body-emotion shorthand, empty-atmosphere shift
   - generic signposting: widen discourse heads/tails while preserving concrete implementation summaries
   - contrastive aphorism: add abstract paired evaluation frames under existing abstract subject/object gates
   - narrative density: add cue variants rather than lowering thresholds first
3. Run fixture3 and inspect added/removed findings before approving.
4. Run full validation and repository verification.

# Key Decisions

- Do not widen broad AI vocabulary as standalone words.
- Do not implement Markdown-layout artifacts in this pass because the user asked about slop widening.
- Prefer slots and reusable gates over exact sentence exceptions.

# Files To Modify

- `behavior/fixtures/textlint-rules/cases/semantic-thinness/no-hits.md`
- `behavior/fixtures/textlint-rules/cases/syntactic-patterns/no-hits.md`
- `behavior/fixtures/textlint-rules/cases/narrative-slop/no-hits.md`
- `src/rules/semantic-thinness/patterns/deictic-summary.json`
- `src/rules/semantic-thinness/patterns/body-emotion-shorthand.json`
- `src/rules/semantic-thinness/patterns/empty-atmosphere-shift.json`
- `src/rules/syntactic-patterns/lead-ins/private/discourse-evaluation.ts`
- `src/rules/syntactic-patterns/lead-ins/generic-signposting.ts`
- `src/rules/syntactic-patterns/contrast/contrastive-aphorism.ts`
- `src/rules/syntactic-patterns/contrast/private/abstract-pair-gates.ts`
- `src/rules/narrative-slop/body-action-density.ts`
- `src/rules/narrative-slop/perception-verb-density.ts`

# Verification

- `scripts/fixture3.sh check --suite textlint-rules`
- review `.fixture3/textlint-rules/diff.txt`
- `scripts/fixture3.sh approve --suite textlint-rules`
- `npm run validate`
- `scripts/verify-all.sh`
