# slopless

Install:

```bash
npm install -D slopless
```

Run:

```bash
npx slopless
```

Run on a specific path:

```bash
npx slopless "docs/**/*.md"
```

Save JSON:

```bash
npx slopless "docs/**/*.md" > slopless.json
```

## Npm Script

Add this to `package.json`:

```json
{
  "scripts": {
    "lint:prose": "slopless"
  }
}
```

Run:

```bash
npm run lint:prose
```

## What Slopless Is

Slopless is a deterministic prose checker for Markdown.

It reports concrete writing patterns that often make generated or careless prose feel padded, vague, generic, or formulaic.

It is built for local scripts, CI checks, review pipelines, and tools that need structured prose findings without calling an LLM.

## What Slopless Is Not

Slopless does not rewrite text.

Slopless does not check facts.

Slopless does not judge taste.

Slopless does not replace editing.

It reports rule findings. A person or another tool decides what to do with them.

## Defaults

- Checks `**/*.md` when no path is passed.
- Emits JSON only.
- Requires Node.js 20 or newer.
- Requires no `.textlintrc.json`.
- Requires no separate `textlint` install.

## Exit Codes

- `0`: no findings
- `1`: prose findings were reported
- `2`: command failure before linting

## Output

Output is always textlint JSON.

Each result contains the checked file path and its messages. Each message includes the rule ID, line, column, message text, and range data when textlint can provide it.

Rule IDs use this shape:

```text
slopless/<rule-name>
```

Example:

```text
slopless/semantic-thinness
slopless/llm-openers
slopless/hedge-stacking
```

## CI Use

Run Slopless in CI:

```bash
npm ci
npm run lint:prose
```

Save findings as an artifact:

```bash
npx slopless "docs/**/*.md" > slopless.json
```

The command exits `1` when findings exist, so CI fails by default on reported prose issues.

## Stdin

Check text from stdin:

```bash
cat draft.md | npx slopless --stdin --stdin-filename draft.md
```

`--stdin-filename` should end in `.md` so textlint parses the input as Markdown.

## Supported Options

Slopless forwards normal textlint file and execution options.

Useful examples:

```bash
npx slopless "docs/**/*.md" --quiet
npx slopless --stdin --stdin-filename draft.md
npx slopless --no-color
```

Unsupported:

```bash
npx slopless --format stylish
npx slopless -f json
```

`--format` and `-f` are rejected because Slopless always emits JSON.

## What It Checks

Slopless checks for:

- stock AI-style phrasing
- empty or generic prose patterns
- rhetorical filler
- weak lead-ins and closers
- hedge stacking
- prohibited or overused vocabulary
- cliches and corporate phrasing
- fake precision signals
- readability and sentence metrics
- Markdown style signals

## Why It Exists

Generated prose often repeats the same rhetorical moves: vague contrast, empty emotional payoff, overconfident summaries, generic transitions, and formulaic conclusions.

General grammar tools are not aimed at those patterns. LLM review can catch them, but it is slower, non-deterministic, and harder to use as a stable CI gate.

Slopless keeps that layer deterministic. It gives projects a repeatable JSON report of known prose issues.

## Advanced Textlint Use

The package also exports a textlint preset for users who already run textlint directly.

`.textlintrc.json`:

```json
{
  "rules": {
    "preset-slopless": true
  }
}
```

Direct textlint use:

```bash
npx textlint "docs/**/*.md"
```

Most users should use `npx slopless` instead.
