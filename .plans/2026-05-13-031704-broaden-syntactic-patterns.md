# Goal

Broaden `@prosesmasher/textlint-rules` syntactic-pattern detection beyond Rust parity where the text shape is structurally clear enough to avoid large false-positive spikes.

# Approach

1. Capture current corpus output for syntactic-pattern rules as the pre-change baseline.
2. Broaden high-value rules by replacing narrow phrase lists with constrained slot templates:
   - `lead-ins/generic-signposting.ts`: abstract lead-in templates like `the <evaluative adjective> <frame noun> is`, `what <verb> is`, and `the point is to`.
   - `closers/boilerplate-conclusion.ts`: tail-position formula closers with bounded summary nouns and predicate shapes.
   - `authority/authority-padding.ts`: authority-subject plus padding-predicate templates for evidence/research/studies/science.
   - `generalization/softening-language.ts`: stacked vague quantifier, modal, qualifier, reporting, and variability signals.
   - `generalization/universalizing-claims.ts`: broad human-group subject plus broad desire/need/behavior predicates.
3. Do not broaden:
   - `colon-dramatic`, because current evidence already shows many false positives.
   - metrics and term-policy, because their strictness is threshold/config, not template coverage.
   - `llm-disclaimer`, because exact leakage is the point.
4. Run textlint over the fixture corpus before and after.
5. Review only new findings. Keep broadening if new findings are mostly bad prose. Tighten or revert any template that mostly catches valid prose.

# Key Decisions

- Use the textlint fixture corpus as an adversarial smoke test, not Rust parity as the target.
- Prefer compositional slot templates over enumerating new phrases.
- Keep all changes inside existing `syntactic-patterns` families and shared matcher helpers.
- Add behavior fixture examples only for template shapes that survive corpus review.

# Files To Modify

- `packages/textlint-rules/src/families/syntactic-patterns/lead-ins/generic-signposting.ts`
- `packages/textlint-rules/src/families/syntactic-patterns/closers/boilerplate-conclusion.ts`
- `packages/textlint-rules/src/families/syntactic-patterns/authority/authority-padding.ts`
- `packages/textlint-rules/src/families/syntactic-patterns/generalization/softening-language.ts`
- `packages/textlint-rules/src/families/syntactic-patterns/generalization/universalizing-claims.ts`
- `behavior/fixtures/textlint-rules/syntactic-patterns/family.md`
- `behavior/fixtures/textlint-rules/syntactic-patterns/fixture.toml`
- `behavior/baselines/textlint-rules/syntactic-patterns.json`
