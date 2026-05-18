# Goal

Make source research state binary.

The end state:

- Implemented material is not listed as candidate material.
- Candidate files list only material that is not implemented.
- Each remaining category says why it is not implemented.
- Active implemented sources stay documented in `legacy/source-material/reviewed/implemented/incorporation-record.md`.

# Approach

1. Compare derived source candidate files against active rule data under `src/families`.
2. Remove implemented phrases, templates, and examples from `legacy/source-material/reviewed/skipped/*.md`.
3. Keep only unimplemented candidates with direct reasons.
4. Avoid new lifecycle labels such as archived, inactive, candidate, partial, or rejected.
5. Verify source-material scripts and fixture state after edits.

# Files To Modify

- `legacy/source-material/reviewed/skipped/academic-slop-candidates.md`
- `legacy/source-material/reviewed/skipped/cliche-template-candidates.md`
- `legacy/source-material/reviewed/skipped/corporate-abstraction-candidates.md`
- `legacy/source-material/reviewed/skipped/llm-artifact-candidates.md`
- `legacy/source-material/reviewed/skipped/narrative-slop-candidates.md`
- `legacy/source-material/reviewed/skipped/redundancy-pattern-candidates.md`
- `legacy/source-material/reviewed/skipped/wordiness-pattern-candidates.md`
- `legacy/source-material/reviewed/implemented/incorporation-record.md`
- `legacy/source-material/README.md`

# Non-Goals

- Do not change rule behavior.
- Do not accept new fixture output.
- Do not add new rule data.
