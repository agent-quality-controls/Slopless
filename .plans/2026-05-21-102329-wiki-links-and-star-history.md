# Goal

Fix README wiki links and add a local star-history export with an analysis notebook.

# Approach

- Replace README `/wiki/...` links with absolute `https://github.com/agent-quality-controls/slopless/wiki/...` links so they work from GitHub and npm.
- Pull all stargazer timestamps from GitHub with `application/vnd.github.star+json`.
- Store raw star events as CSV with one row per star.
- Add a Jupyter notebook that loads the CSV and plots cumulative stars, per-minute increments, and minute-by-minute intervals.

# Key Decisions

- Use GitHub's REST stargazers endpoint through `gh api --paginate` because it exposes `starred_at` and is enough for current repo scale.
- Keep the CSV in the repo because current star history is small and reproducible.
- Keep the notebook deterministic and local-only; it reads the checked-in CSV.

# Files To Modify

- `README.md`
- `analytics/star-history/slopless-stars.csv`
- `analytics/star-history/star-history.ipynb`
- `.worklogs/<timestamp>-wiki-links-and-star-history.md`
