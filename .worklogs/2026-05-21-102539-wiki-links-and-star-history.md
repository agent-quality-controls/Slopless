# Summary

Fixed README wiki links by replacing root-relative `/wiki/...` URLs with absolute GitHub wiki URLs. Exported the full Slopless stargazer history to CSV and added a Jupyter notebook for minute-level star growth analysis.

# Decisions Made

- Used absolute wiki URLs because they work from GitHub, npm, and any rendered README context.
- Kept one raw CSV row per star with `starred_at`, `user`, and `user_url`.
- Built the notebook around minute-level resampling plus seconds-between-stars plots so bursts are visible without losing exact timestamps.
- Left the G3TS debug files uncommitted.

# Key Files For Context

- `README.md`
- `analytics/star-history/slopless-stars.csv`
- `analytics/star-history/star-history.ipynb`

# Verification

- Cloned the wiki repo and confirmed the referenced pages exist.
- Checked all six wiki URLs return HTTP 200.
- Pulled 255 stargazer records with GitHub API `application/vnd.github.star+json`.
- Parsed the notebook JSON with `jq empty`.
- Loaded the CSV with pandas and generated the minute-level time series.
- `pnpm exec prettier --check README.md .plans/2026-05-21-102329-wiki-links-and-star-history.md`

# Next Steps

- Re-run the GitHub API export when the star history needs to be refreshed.
