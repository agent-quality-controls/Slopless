# Goal

Use broad AI-associated vocabulary without turning every single word into a false positive. Add density-based detection for broad AI diction while preserving the existing single-token `llm-vocabulary` rule.

# Approach

- Add `words:llm-vocabulary-density`.
- Report only when multiple broad AI terms cluster in a short paragraph or sentence window.
- Use broad slots for AI-post diction:
  - `robust`, `seamless`, `nuanced`, `comprehensive`, `pivotal`, `vital`, `scalable`, `transformative`, `elevate`, `unlock`, `insights`, `impact`, `ecosystem`, `landscape`, `realm`, `tapestry`, `intricate`, `delve`
- Add no-hit cases with one or two terms, quoted usage, literal landscape/realm contexts, or concrete evidence.
- Export, register, and enable the new rule in the `everything` preset.

# Widening Manifest

- Density words
  - Bad slots: `approach`, `ecosystem`, `elevate`, `impact`, `insight`, `nuanced`, `robust`, `scalable`, `seamless`, `strategy`, `touchpoint`, `transformative`, `unlock`, `workflow`.
  - Report threshold: 4 words in a paragraph or short sentence window.
- Hit controls
  - Synthetic editorial diction: `scalable approach unlocks nuanced insight across the ecosystem`.
  - Strategy diction: `transformative strategy elevates impact across every workflow`.
  - Product diction: `scalable ecosystem unlocks nuanced transformation at every touchpoint`.
- No-hit controls
  - One stock word with concrete measurement.
  - One stock word in ecological literal usage.
  - Quoted/editorial discussion that does not cluster enough terms.

# Audit Result

- Fixture no-hit files: 0 findings.
- Corpus coverage: density hit cases had to remain separate paragraphs so the corpus emits the same report signatures as the cases.
- Suppression used: density threshold only. Single words remain handled by the existing `llm-vocabulary` rule.

# Files To Modify

- `src/rules/words/llm-vocabulary-density.ts`
- `src/registries/words.ts`
- `src/presets/everything.ts`
- `package.json`
- `behavior/fixtures/textlint-rules/cases/words/hits.md`
- `behavior/fixtures/textlint-rules/cases/words/no-hits.md`
- `behavior/fixtures/textlint-rules/corpus/editorial-style.md`
- `behavior/fixtures/textlint-rules/corpus/editorial-style.preserve.json`

# Verification

- `scripts/verify-maximal-widening.py`
- `scripts/fixture3.sh check --suite textlint-rules`
- `scripts/verify-all.sh`
- `npm run validate`
