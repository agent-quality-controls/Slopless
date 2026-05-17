#!/usr/bin/env python3
from __future__ import annotations

import json
from pathlib import Path


ROOT = Path(__file__).resolve().parents[1]


def read_text(relative: str) -> str:
    return (ROOT / relative).read_text(encoding="utf-8")


def require(errors: list[str], condition: bool, message: str) -> None:
    if not condition:
        errors.append(message)


def verify_tree(errors: list[str]) -> None:
    require(errors, (ROOT / "src/rules").is_dir(), "missing src/rules")
    require(errors, not (ROOT / "src/families").exists(), "src/families must not exist")
    require(errors, (ROOT / "src/reporting/types.ts").is_file(), "missing src/reporting/types.ts")
    require(
        errors,
        (ROOT / "src/reporting/report-density.ts").is_file(),
        "missing src/reporting/report-density.ts",
    )


def verify_package_exports(errors: list[str]) -> None:
    package = json.loads(read_text("package.json"))
    exports = package.get("exports", {})
    require(errors, isinstance(exports, dict), "package.json exports must be an object")
    if not isinstance(exports, dict):
        return

    for name, target in exports.items():
        if name == ".":
            continue
        require(errors, str(name).startswith("./rules/"), f"export is not under ./rules: {name}")
        require(
            errors,
            str(target).startswith("./dist/rules/"),
            f"export target is not under ./dist/rules: {name} -> {target}",
        )


def verify_no_stale_paths(errors: list[str]) -> None:
    checked_suffixes = {".ts", ".js", ".json", ".md", ".py", ".sh", ".toml", ".yaml", ".yml"}
    for path in ROOT.rglob("*"):
        if not path.is_file() or path.suffix not in checked_suffixes:
            continue
        if any(part in {".git", ".plans", ".worklogs", "dist", "node_modules"} for part in path.parts):
            continue
        if path == Path(__file__).resolve():
            continue
        text = path.read_text(encoding="utf-8", errors="ignore")
        relative = path.relative_to(ROOT)
        for stale in ("src/families", "dist/families", "../families", "../../families"):
            if stale in text:
                errors.append(f"{relative} contains stale path {stale}")


def verify_runner(errors: list[str]) -> None:
    text = read_text("scripts/behavior-replay.sh")
    require(errors, "dist/rules" in text, "behavior runner must use dist/rules")
    require(errors, "dist/families" not in text, "behavior runner must not use dist/families")


def verify_density_rules(errors: list[str]) -> None:
    for relative in [
        "src/rules/narrative-slop/body-action-density.ts",
        "src/rules/narrative-slop/perception-verb-density.ts",
    ]:
        text = read_text(relative)
        require(errors, "firstDensityMatch" in text, f"{relative} must use report-density")
        require(errors, "splitSentences" not in text, f"{relative} must not own sentence-window density")
        require(errors, "denseMatchForSpan" not in text, f"{relative} must not own density matching")


def main() -> int:
    errors: list[str] = []
    verify_tree(errors)
    verify_package_exports(errors)
    verify_no_stale_paths(errors)
    verify_runner(errors)
    verify_density_rules(errors)

    if errors:
        print("FAIL rules-reporting-architecture")
        for error in errors:
            print(f"- {error}")
        return 1

    print("PASS rules-reporting-architecture")
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
