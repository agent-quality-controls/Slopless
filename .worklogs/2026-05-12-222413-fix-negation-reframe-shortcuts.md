# Fix Negation-Reframe Shortcuts

## Summary

Removed shortcut matching from the TypeScript `negation-reframe` rule. The rule now runs on paragraph-level plain text, maps evidence ranges back to source, and uses named syntactic templates instead of direct phrase and broad prefix shortcuts.

## Decisions Made

- Removed the direct `not just` phrase match because it bypassed the syntactic-template family boundary.
- Moved paragraph text extraction into the shared text traversal helper because syntactic rules need full paragraph text instead of inline `Str` fragments.
- Split reusable negation parts into `negation-reframe-parts.ts` so the matcher stays under lint limits without changing global formatter behavior.
- Narrowed inline comma contrast to comma-plus-`not` because contracted verbs after a comma, such as `can't do its job`, are not the same construction.
- Added a golden fixture sentence for the contracted-verb false positive and kept the existing expected output unchanged.

## Key Files

- `packages/textlint-rules/src/families/syntactic-patterns/contrast/negation-reframe.ts`
- `packages/textlint-rules/src/shared/matchers/syntactic-templates.ts`
- `packages/textlint-rules/src/shared/matchers/negation-reframe-parts.ts`
- `packages/textlint-rules/src/shared/text/traverse.ts`
- `behavior/fixtures/textlint-rules/syntactic-patterns/family.md`

## Verification

- `npm run validate`
- `scripts/behavior-verify.sh`
- `python3 scripts/verify-textlint-implementation-manifest.py --manifest .plans/2026-05-12-203442-textlint-implementation-plan.md.manifest.toml all`
- Full fixture corpus probe: 389 `negation-reframe` findings, no bare `not just`, no passive-definition probe, no social-anxiety inheritance probe, no `Swap:` probe, no parasympathetic contracted-verb probe.

## Next Steps

- Review the remaining two quote-heavy sentence-pair findings separately when quoted questions become the next rule boundary.
