# Term Policy Rust Good Catches

Source command: `cargo run -q -p prosesmasher -- check ../../behavior/fixtures/textlint-rules/term-policy/family.md --config /tmp/term-policy-config.json --format json --include-checks --check required-terms,recommended-terms`.

## Findings

- `recommended-terms`: at least 4 of 5 pool terms present; observed=3
- `required-term-borrowing`: term "borrowing" must appear; observed=0

## Passing Checks

- `required-term-ownership`: observed=1
