# Summary, Vague, And Subjective Expansion

## Goal

Implement the remaining prose-scope web-research candidates that are bounded enough for deterministic Slopless rules.

Excluded: light-verb wordiness. MAGPIE remains fixture/no-hit source material rather than a direct rule source.

## Approach

- Expand `syntactic-patterns:summative-closer` with stock summary and conclusion openers from the research queue.
- Expand `syntactic-patterns:uncited-authority` with vague attribution frames that make source claims without local evidence.
- Expand `syntactic-patterns:universalizing-claims` with vague quantifier plus abstract noun frames, guarded by evidence markers.
- Expand `semantic-thinness` puffery pattern data with subjective overstatement templates.
- Add syntactic and semantic case hits/no-hits and mirror them into flowing corpus prose.
- Update preserve metadata, golden output, research bookkeeping, and verifier coverage.

## Key Decisions

- Do not add direct word bans for subjective adjectives.
- Do not import MAGPIE idioms as rules; use it later for literal/idiomatic false-positive controls.
- Keep vague quantifier detection narrow: only broad quantifier plus abstract noun with no local number, citation, named source, or explicit examples.
- Keep vague attribution under authority because the defect is unsupported source attribution.

## Files To Modify

- `src/rules/syntactic-patterns/closers/summative-closer.ts`
- `src/rules/syntactic-patterns/authority/uncited-authority.ts`
- `src/rules/syntactic-patterns/generalization/universalizing-claims.ts`
- `src/rules/semantic-thinness/patterns/puffery-evaluative-claim.json`
- `behavior/fixtures/textlint-rules/cases/syntactic-patterns/hits.md`
- `behavior/fixtures/textlint-rules/cases/syntactic-patterns/no-hits.md`
- `behavior/fixtures/textlint-rules/cases/semantic-thinness/hits.md`
- `behavior/fixtures/textlint-rules/cases/semantic-thinness/no-hits.md`
- `behavior/fixtures/textlint-rules/corpus/*.md`
- `legacy/source-material/reviewed/deferred/remaining-candidates.md`
- `legacy/source-material/reviewed/implemented/incorporation-record.md`
- `scripts/verify-summary-vague-subjective-expansion.py`
- `scripts/verify-all.sh`
