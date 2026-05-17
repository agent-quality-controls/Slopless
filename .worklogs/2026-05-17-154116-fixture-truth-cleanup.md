# Summary

Cleaned fixture truth after reviewed good catches were found in no-hit files.

The good catches were moved into their owning hit files, no-hit controls were rewritten into clean controls, and every changed case was represented in corpus prose with matching preserve metadata.

# Decisions Made

- Moved `The moment passed.` from semantic-thinness no-hit material into semantic-thinness hits because the rule correctly flags it as thin prose.
- Moved four syntactic-pattern no-hit lines into syntactic-pattern hits because they are legitimate matches for negation, lesson framing, and boilerplate conclusion patterns.
- Rewrote accidental no-hit triggers instead of weakening rules because replay showed the fixture truth was wrong, not the rule behavior.
- Updated corpus prose and preserve metadata instead of accepting fixture3 output.

# Key Files For Context

- `.plans/2026-05-17-152809-fixture-truth-cleanup.md`
- `behavior/fixtures/textlint-rules/cases/semantic-thinness/hits.md`
- `behavior/fixtures/textlint-rules/cases/semantic-thinness/no-hits.md`
- `behavior/fixtures/textlint-rules/cases/syntactic-patterns/hits.md`
- `behavior/fixtures/textlint-rules/cases/syntactic-patterns/no-hits.md`
- `behavior/fixtures/textlint-rules/cases/metrics/no-hits.md`
- `behavior/fixtures/textlint-rules/cases/academic-slop/no-hits.md`
- `behavior/fixtures/textlint-rules/cases/term-policy/no-hits.md`
- `behavior/fixtures/textlint-rules/corpus/engineering-review.md`
- `behavior/fixtures/textlint-rules/corpus/health-and-parenting.md`
- `behavior/fixtures/textlint-rules/corpus/metrics-and-markdown.md`
- `behavior/fixtures/textlint-rules/corpus/narrative-scenes.md`
- `behavior/fixtures/textlint-rules/corpus/technical-terminology.md`

# Verification

- `scripts/behavior-replay.sh > .fixture3/textlint-rules/received.raw.json`
- `scripts/normalize-textlint-golden-output.py < .fixture3/textlint-rules/received.raw.json > .fixture3/textlint-rules/received.normalized.json`
- no-hit scanner: `no_hit_message_count=0`
- `scripts/verify-all.sh`
- `npm run validate`
- Adversarial fixture review: no blocking findings

# Next Steps

- Review `.fixture3/textlint-rules/received.normalized.json` separately before accepting fixture output.
