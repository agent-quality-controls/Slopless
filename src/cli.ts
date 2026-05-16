#!/usr/bin/env node

import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";
import { cli } from "textlint/lib/src/cli.js";

const DEFAULT_TARGET = "**/*.md";
const FORMAT_FLAGS = new Set(["--format", "-f"]);
const HELP_FLAGS = new Set(["--help", "-h"]);
const VERSION_FLAGS = new Set(["--version", "-v"]);
const VERSION = "0.2.3";
const HELP_TEXT = `Slopless checks Markdown prose for deterministic slop signals and writes JSON.

Install:
  npm install -D slopless

Run:
  npx slopless
  npx slopless "docs/**/*.md"
  npx slopless draft.md > slopless.json

Package script:
  {
    "scripts": {
      "lint:prose": "slopless"
    }
  }

Default behavior:
  - If no file path is passed, Slopless checks **/*.md.
  - Output is always JSON.
  - Exit 0 means no findings.
  - Exit 1 means Slopless found prose issues.
  - Exit 2 means the command failed before linting.
  - No .textlintrc.json is required.
  - No separate textlint install is required.

What it is for:
  Slopless is for deterministic prose checks in CI, local scripts, and review
  pipelines. It catches repeated AI-style phrasing, empty claims, rhetorical
  filler, weak lead-ins and closers, hedge stacking, readability problems, and
  Markdown style signals.

What it is not for:
  Slopless does not rewrite text, check facts, judge taste, or replace human
  editing. It reports concrete rule findings that another tool or person can
  review.

Useful forms:
  npx slopless --stdin --stdin-filename draft.md
  npx slopless "docs/**/*.md" > slopless.json
  npx slopless "docs/**/*.md" --quiet

Unsupported:
  --format and -f are rejected. JSON is the only output format.
`;

function hasFormatOverride(args: readonly string[]): boolean {
  return args.some(
    (arg, index) =>
      FORMAT_FLAGS.has(arg) ||
      arg.startsWith("--format=") ||
      (index > 0 && FORMAT_FLAGS.has(args[index - 1] ?? ""))
  );
}

function hasFlag(args: readonly string[], flags: ReadonlySet<string>): boolean {
  return args.some((arg) => flags.has(arg));
}

function hasFileTarget(args: readonly string[]): boolean {
  return args.some((arg) => !arg.startsWith("-"));
}

function packageNodeModules(): string {
  const packageRoot = dirname(dirname(fileURLToPath(import.meta.url)));

  return resolve(packageRoot, "..");
}

async function main(): Promise<number> {
  const userArgs = process.argv.slice(2);

  if (hasFlag(userArgs, HELP_FLAGS)) {
    process.stdout.write(HELP_TEXT);
    return 0;
  }

  if (hasFlag(userArgs, VERSION_FLAGS)) {
    process.stdout.write(`${VERSION}\n`);
    return 0;
  }

  if (hasFormatOverride(userArgs)) {
    process.stderr.write(
      "slopless always writes JSON output. Remove --format / -f.\n"
    );
    return 2;
  }

  const args = [
    "node",
    "slopless",
    "--preset",
    "slopless",
    "--rules-base-directory",
    packageNodeModules(),
    "--format",
    "json",
    ...userArgs
  ];

  if (!hasFileTarget(userArgs)) {
    args.push(DEFAULT_TARGET);
  }

  return cli.execute(args);
}

process.exitCode = await main();
