# Term Policy Textlint Diff

Source command: `./scripts/behavior-replay.sh behavior/fixtures/textlint-rules/term-policy/family.md`.

## Result

- Rust failures: 2
- Textlint failures: 2
- Textlint `recommended-terms`: Recommended terms present: 3. Include at least 4 terms from the policy pool.
- Textlint `required-terms`: Required term missing: "borrowing". Add the term or update the policy.

## Corpus Note

- The broad fixture corpus is not comparable for term-policy because these rules require project-specific configured terms.
- Running textlint defaults on the corpus produces no term-policy findings because these rules are no-op without explicit options.
