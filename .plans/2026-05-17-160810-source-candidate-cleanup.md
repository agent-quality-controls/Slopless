# Goal

Make source research state binary.

The end state:

- Implemented material is not listed as candidate material.
- Candidate files list only material that is not implemented.
- Each remaining category says why it is not implemented.
- Active implemented sources stay documented in `data/source-material/incorporation-record.md`.

# Approach

1. Compare derived source candidate files against active rule data under `src/families`.
2. Remove implemented phrases, templates, and examples from `data/source-material/derived/*.md`.
3. Keep only unimplemented candidates with direct reasons.
4. Avoid new lifecycle labels such as archived, inactive, candidate, partial, or rejected.
5. Verify source-material scripts and fixture state after edits.

# Files To Modify

- `data/source-material/derived/academic-slop-candidates.md`
- `data/source-material/derived/cliche-template-candidates.md`
- `data/source-material/derived/corporate-abstraction-candidates.md`
- `data/source-material/derived/llm-artifact-candidates.md`
- `data/source-material/derived/narrative-slop-candidates.md`
- `data/source-material/derived/redundancy-pattern-candidates.md`
- `data/source-material/derived/wordiness-pattern-candidates.md`
- `data/source-material/incorporation-record.md`
- `data/source-material/README.md`

# Non-Goals

- Do not change rule behavior.
- Do not accept new fixture output.
- Do not add new rule data.
