#!/usr/bin/env python3
from __future__ import annotations

import tomllib
from pathlib import Path
from typing import Any


ROOT = Path(__file__).resolve().parents[1]
MANIFEST = ROOT / ".plans/2026-05-18-185457-dataset-source-material-reorganization.md.manifest.toml"


def read_text(path: Path) -> str:
    return path.read_text(encoding="utf-8")


def rows(data: dict[str, Any], key: str) -> list[dict[str, Any]]:
    value = data.get(key, [])
    if not isinstance(value, list):
        raise TypeError(f"manifest key {key} must be a list")
    return [item for item in value if isinstance(item, dict)]


def verify_required_dirs(errors: list[str], data: dict[str, Any]) -> None:
    for row in rows(data, "required_dir"):
        path = ROOT / str(row["path"])
        if not path.is_dir():
            errors.append(f"missing required directory: {path.relative_to(ROOT)}")


def verify_required_files(errors: list[str], data: dict[str, Any]) -> None:
    for row in rows(data, "required_file"):
        path = ROOT / str(row["path"])
        if not path.is_file():
            errors.append(f"missing required file: {path.relative_to(ROOT)}")


def verify_forbidden_paths(errors: list[str], data: dict[str, Any]) -> None:
    for row in rows(data, "forbidden_path"):
        path = ROOT / str(row["path"])
        if path.exists():
            errors.append(f"forbidden path exists: {path.relative_to(ROOT)}")


def verify_inventory_text(errors: list[str], data: dict[str, Any]) -> None:
    for row in rows(data, "inventory_contains"):
        path = ROOT / str(row["path"])
        if not path.is_file():
            errors.append(f"missing inventory file: {path.relative_to(ROOT)}")
            continue

        text = read_text(path)
        for value in row.get("values", []):
            if str(value) not in text:
                errors.append(f"{path.relative_to(ROOT)} missing text: {value}")


def verify_fixture_boundaries(errors: list[str]) -> None:
    fixture_root = ROOT / "behavior" / "fixtures" / "textlint-rules"
    golden_roots = sorted((ROOT / "behavior" / "golden").glob("textlint-rules-*"))
    if not fixture_root.is_dir():
        errors.append("missing Fixture3 fixture root: behavior/fixtures/textlint-rules")
    if not golden_roots:
        errors.append("missing Fixture3 golden roots: behavior/golden/textlint-rules-*")


def main() -> int:
    data = tomllib.loads(read_text(MANIFEST))
    errors: list[str] = []

    verify_required_dirs(errors, data)
    verify_required_files(errors, data)
    verify_forbidden_paths(errors, data)
    verify_inventory_text(errors, data)
    verify_fixture_boundaries(errors)

    if errors:
        print("FAIL dataset-source-reorganization")
        for error in errors:
            print(f"- {error}")
        return 1

    print("PASS dataset-source-reorganization")
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
