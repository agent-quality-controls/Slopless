# Contributing to slopless

Thanks for your interest. Slopless is a deterministic textlint rule set and CLI - no LLM in the loop, ever. Contributions that make the rules sharper, faster, or more honest are welcome.

## Dev setup

Requires Node.js 20 or newer.

```bash
git clone https://github.com/agent-quality-controls/slopless.git
cd slopless
npm install
npm run build
```

## Run

```bash
npx slopless "docs/**/*.md"
```

## Checks

```bash
npm run validate
```

Runs build, eslint, stylelint, prettier check, cspell, type-coverage at 100%, and guardrail3-ts rule validation. PRs are expected to pass this command.

## Adding a rule

1. Pick a group under `src/rules/` that fits (or propose a new one in an issue first).
2. Add the rule module. Export `id`, `meta`, and a textlint reporter.
3. Register it in `src/registries/`.
4. Add fixtures under `data/` covering positives, negatives, and known false positives.
5. Run `npm run validate`.
6. Update `README.md` with a one-line rule entry under the right section.

## Rule design principles

- **Deterministic.** No LLMs, no probabilistic scoring. Same input, same output, every time.
- **Narrow.** Each rule targets one specific pattern. Don't bundle.
- **Owned by data.** If the rule is dictionary-based, the dictionary lives in `data/` and is testable in isolation.
- **Honest about coverage.** Document known false positives in fixtures rather than papering over them.

## Pull request expectations

- One logical change per PR.
- Tests and validation passing.
- Changelog entry if user-facing.
- README updated if the rule list changed.
