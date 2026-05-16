# Goal

Migrate the Rust `llm-slop` checks into the TypeScript textlint taxonomy without preserving the old Rust crate-family names.

# Scope

Rust source checks:

- `llm-disclaimer`
- `response-wrapper`
- `generic-signposting`
- `boilerplate-framing`
- `llm-vocabulary`
- `softening-language`
- `universalizing-claims`
- `boilerplate-conclusion`
- `empty-emphasis`
- `contrastive-aphorism`
- `blame-reframe`
- `authority-padding`
- `lesson-framing`
- `observer-guidance`

# Mapping

- `llm-disclaimer` -> `phrases/llm-disclaimer.ts`
- `llm-vocabulary` -> `words/llm-vocabulary.ts`
- `response-wrapper` -> `syntactic-patterns/llm-artifacts/response-wrapper.ts`
- `generic-signposting` -> `syntactic-patterns/lead-ins/generic-signposting.ts`
- `boilerplate-framing` -> `syntactic-patterns/lead-ins/boilerplate-framing.ts`
- `lesson-framing` -> `syntactic-patterns/lead-ins/lesson-framing.ts`
- `observer-guidance` -> `syntactic-patterns/lead-ins/observer-guidance.ts`
- `boilerplate-conclusion` -> `syntactic-patterns/closers/boilerplate-conclusion.ts`
- `authority-padding` -> `syntactic-patterns/authority/authority-padding.ts`
- `softening-language` -> `syntactic-patterns/generalization/softening-language.ts`
- `universalizing-claims` -> `syntactic-patterns/generalization/universalizing-claims.ts`
- `contrastive-aphorism` -> `syntactic-patterns/contrast/contrastive-aphorism.ts`
- `blame-reframe` -> `syntactic-patterns/contrast/blame-reframe.ts`
- `empty-emphasis` -> `syntactic-patterns/repetition/empty-emphasis.ts`

# Approach

1. Update the manifest with every mapped rule and preset entry.
2. Add small reusable matcher helpers only where multiple rules need them.
3. Port each rule's Rust matching behavior into its TypeScript family path.
4. Wire rules through family registries, package exports, and `everything`.
5. Expand family fixtures for words, phrases, and syntactic-patterns.
6. Regenerate behavior baselines.
7. Run package validation, behavior verify, and manifest verify.
8. Write worklog, commit, and push.

# Key Decisions

- `llm-vocabulary` goes to `words`, not `phrases`, because it is single-token matching.
- `llm-disclaimer` goes to `phrases`, not `syntactic-patterns`, because the Rust rule is fixed phrase leakage matching.
- No migrated Rust `llm-slop` rule belongs in `semantic-thinness`; none of them performs semantic parsing.
- Keep rule IDs stable even when family paths change.

# Files To Modify

- `.plans/2026-05-12-203442-textlint-implementation-plan.md.manifest.toml`
- `packages/textlint-rules/package.json`
- `packages/textlint-rules/src/families/phrases/llm-disclaimer.ts`
- `packages/textlint-rules/src/families/words/llm-vocabulary.ts`
- `packages/textlint-rules/src/families/syntactic-patterns/llm-artifacts/response-wrapper.ts`
- `packages/textlint-rules/src/families/syntactic-patterns/lead-ins/generic-signposting.ts`
- `packages/textlint-rules/src/families/syntactic-patterns/lead-ins/boilerplate-framing.ts`
- `packages/textlint-rules/src/families/syntactic-patterns/lead-ins/lesson-framing.ts`
- `packages/textlint-rules/src/families/syntactic-patterns/lead-ins/observer-guidance.ts`
- `packages/textlint-rules/src/families/syntactic-patterns/closers/boilerplate-conclusion.ts`
- `packages/textlint-rules/src/families/syntactic-patterns/authority/authority-padding.ts`
- `packages/textlint-rules/src/families/syntactic-patterns/generalization/softening-language.ts`
- `packages/textlint-rules/src/families/syntactic-patterns/generalization/universalizing-claims.ts`
- `packages/textlint-rules/src/families/syntactic-patterns/contrast/contrastive-aphorism.ts`
- `packages/textlint-rules/src/families/syntactic-patterns/contrast/blame-reframe.ts`
- `packages/textlint-rules/src/families/syntactic-patterns/repetition/empty-emphasis.ts`
- `packages/textlint-rules/src/shared/matchers/llm-slop.ts`
- `packages/textlint-rules/src/registries/phrases.ts`
- `packages/textlint-rules/src/registries/words.ts`
- `packages/textlint-rules/src/registries/syntactic-patterns.ts`
- `packages/textlint-rules/src/registries/syntactic-patterns/authority.ts`
- `packages/textlint-rules/src/registries/syntactic-patterns/closers.ts`
- `packages/textlint-rules/src/registries/syntactic-patterns/contrast.ts`
- `packages/textlint-rules/src/registries/syntactic-patterns/generalization.ts`
- `packages/textlint-rules/src/registries/syntactic-patterns/lead-ins.ts`
- `packages/textlint-rules/src/registries/syntactic-patterns/llm-artifacts.ts`
- `packages/textlint-rules/src/registries/syntactic-patterns/repetition.ts`
- `packages/textlint-rules/src/presets/everything.ts`
- `behavior/fixtures/textlint-rules/phrases/family.md`
- `behavior/fixtures/textlint-rules/phrases/fixture.toml`
- `behavior/fixtures/textlint-rules/words/family.md`
- `behavior/fixtures/textlint-rules/words/fixture.toml`
- `behavior/fixtures/textlint-rules/syntactic-patterns/family.md`
- `behavior/fixtures/textlint-rules/syntactic-patterns/fixture.toml`
- `behavior/baselines/textlint-rules/phrases.json`
- `behavior/baselines/textlint-rules/words.json`
- `behavior/baselines/textlint-rules/syntactic-patterns.json`
