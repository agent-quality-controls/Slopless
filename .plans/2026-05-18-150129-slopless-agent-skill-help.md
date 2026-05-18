# Slopless Agent Skill And Help

## Goal

Make Slopless easier for agents to use after npm install by improving README/help, adding a repo-local skill installer, and shipping one canonical skill body for Codex and Claude Code.

## Approach

- Update `src/cli.ts` help text to state English-only scope, JSON-only output, agent-first workflow, `.slopless/findings/` storage convention, and separate `install-skill codex` / `install-skill claude` commands.
- Add `install-skill` handling in `src/cli.ts` before textlint delegation. It copies the bundled `skills/slopless` directory to either `./.agents/skills/slopless` or `./.claude/skills/slopless`.
- Fail if the destination already exists unless `--force` is passed.
- Add one canonical `skills/slopless/SKILL.md` shared by both installations.
- Update `README.md` with install, usage, English-only scope, JSON-only output, findings storage convention, and skill install commands.
- Update `package.json` files list to ship `skills` in the npm package.
- Fix the CLI version constant to match `package.json`.

## Key Decisions

- No `docs/` folder: agents using the package see README, help, and installed skills, not arbitrary repo docs.
- No Markdown output mode: Slopless remains JSON-only. Agents may summarize JSON for users outside the CLI.
- No `both` install command: Codex and Claude Code installs stay separate because dual use is uncommon.
- No Codex `agents/openai.yaml` metadata now: behavior does not require it, and one identical skill folder is simpler.

## Files To Modify

- `src/cli.ts`
- `README.md`
- `package.json`
- `skills/slopless/SKILL.md`
