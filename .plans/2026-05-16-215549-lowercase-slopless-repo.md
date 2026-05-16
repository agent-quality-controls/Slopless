# Goal

Move Slopless to the lowercase local path and GitHub repository path:

- `/Users/tartakovsky/Projects/agent-quality-controls/slopless`
- `https://github.com/agent-quality-controls/slopless`

# Approach

- Rename the GitHub repository from `Slopless` to `slopless`.
- Move the local working tree from `/Users/tartakovsky/Projects/Slopless` to `/Users/tartakovsky/Projects/agent-quality-controls/slopless`.
- Update package metadata URLs to the lowercase repository path.
- Publish a patch release so npm metadata also points at the lowercase repository path.

# Files To Modify

- `package.json`
- `package-lock.json`
- `src/cli.ts`
- `.worklogs/*`
