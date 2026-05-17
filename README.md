# slopless

[![npm](https://img.shields.io/npm/v/slopless?label=npm)](https://www.npmjs.com/package/slopless)
[![downloads](https://img.shields.io/npm/dm/slopless)](https://www.npmjs.com/package/slopless)
[![license](https://img.shields.io/npm/l/slopless)](LICENSE)
[![ci](https://img.shields.io/github/actions/workflow/status/agent-quality-controls%2Fslopless/ci.yml?branch=main&label=ci)](/actions/workflows/ci.yml)
[![node](https://img.shields.io/node/v/slopless)](package.json)

Catch AI and human slop in Markdown without calling an LLM. Slopless ships 50+ deterministic textlint rules and a CLI that emits structured JSON findings.

## Install

```bash
npm install -D slopless
```

## Quick start

```bash
npx slopless "docs/**/*.md"
```

Slopless requires a file path, glob, or stdin input. A bare `npx slopless` exits with code `2`. Exit `0` means clean, `1` means findings, `2` means failure.

## More

- [Philosophy](/wiki/Philosophy) - what slopless is for, design principles, why deterministic.
- [Comparison](/wiki/Comparison) - slopless vs proselint, write-good, alex, vale, default textlint presets.
- [Rules](/wiki/Rules) - full 50+ rule inventory across seven families.
- [Behavior](/wiki/Behavior) - CLI flags, exit codes, JSON output shape, direct textlint integration.
- [Ignore rules](/wiki/Ignore-Rules) - inline `textlint-disable` block syntax.
- [Thanks](/wiki/Thanks) - direct rule sources, dependencies, and acknowledgments.
- [Contributing](.github/CONTRIBUTING.md) - open a detailed issue first; PRs must pass the G3TS pre-commit gate.

---

Part of [Agent Quality Controls](https://github.com/agent-quality-controls).
