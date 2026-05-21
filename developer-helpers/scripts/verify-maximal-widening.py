#!/usr/bin/env python3
from __future__ import annotations

import json
import sys
import tomllib
from pathlib import Path
from typing import Any


ROOT = Path(__file__).resolve().parents[2]
MANIFESTS = [
    ROOT / ".plans/2026-05-19-144747-semantic-max-widening.md.manifest.toml",
    ROOT / ".plans/2026-05-19-144747-syntactic-max-widening.md.manifest.toml",
    ROOT / ".plans/2026-05-19-144747-vocabulary-density-widening.md.manifest.toml",
    ROOT / ".plans/2026-05-19-144747-narrative-max-widening.md.manifest.toml",
]
PACKAGE_JSON = ROOT / "package.json"
PRESET = ROOT / "src/presets/everything.ts"


def read_text(path: Path) -> str:
    return path.read_text(encoding="utf-8")


def rows(data: dict[str, Any], key: str) -> list[dict[str, Any]]:
    value = data.get(key, [])
    if not isinstance(value, list):
        raise TypeError(f"{key} must be a list")
    return [item for item in value if isinstance(item, dict)]


def preserve_path_for(corpus_path: Path) -> Path:
    return corpus_path.with_suffix(".preserve.json")


def preserve_has_entry(path: Path, family: str, bucket: str, text: str) -> bool:
    data = json.loads(read_text(path))
    preserve = data.get("preserve")
    if not isinstance(preserve, list):
        return False
    return any(
        isinstance(item, dict)
        and item.get("family") == family
        and item.get("bucket") == bucket
        and item.get("text") == text
        for item in preserve
    )


def verify_case_line(errors: list[str], row: dict[str, Any]) -> None:
    family = str(row["family"])
    bucket = str(row["bucket"])
    text = str(row["text"])
    case_path = ROOT / str(row["path"])
    corpus_path = ROOT / str(row["corpus"])

    if not case_path.is_file():
        errors.append(f"missing case file: {case_path.relative_to(ROOT)}")
        return
    if text not in set(read_text(case_path).splitlines()):
        errors.append(f"{case_path.relative_to(ROOT)} missing exact line: {text}")

    if not corpus_path.is_file():
        errors.append(f"missing corpus file: {corpus_path.relative_to(ROOT)}")
        return
    if text not in read_text(corpus_path):
        errors.append(f"{corpus_path.relative_to(ROOT)} missing text: {text}")

    preserve_path = preserve_path_for(corpus_path)
    if not preserve_path.is_file():
        errors.append(f"missing preserve file: {preserve_path.relative_to(ROOT)}")
        return
    if not preserve_has_entry(preserve_path, family, bucket, text):
        errors.append(
            f"{preserve_path.relative_to(ROOT)} missing preserve entry: {family}/{bucket}: {text}"
        )


def verify_required_text(errors: list[str], path: Path, required: list[Any]) -> None:
    if not path.is_file():
        errors.append(f"missing file: {path.relative_to(ROOT)}")
        return
    source = read_text(path)
    for item in required:
        if str(item) not in source:
            errors.append(f"{path.relative_to(ROOT)} missing required text: {item}")


def verify_rule_widening(errors: list[str], row: dict[str, Any]) -> None:
    verify_required_text(errors, ROOT / str(row["path"]), row["required_text"])


def verify_new_rule(errors: list[str], row: dict[str, Any]) -> None:
    rule_id = str(row["id"])
    short_id = rule_id.split(":")[-1]
    path = ROOT / str(row["path"])
    registry = ROOT / str(row["registry"])
    package_export = str(row["package_export"])
    package = json.loads(read_text(PACKAGE_JSON))
    exports = package.get("exports", {})
    preset_text = read_text(PRESET)

    verify_required_text(errors, path, [rule_id, *row["required_text"]])
    verify_required_text(errors, registry, [f'"{short_id}"'])
    if package_export not in exports:
        errors.append(f"package.json missing export: {package_export}")
    if f'"{short_id}": true' not in preset_text:
        errors.append(f"src/presets/everything.ts missing preset key: {short_id}")


def main() -> int:
    errors: list[str] = []

    for manifest in MANIFESTS:
        data = tomllib.loads(read_text(manifest))
        for row in rows(data, "case_line"):
            verify_case_line(errors, row)
        for row in rows(data, "rule_widening"):
            verify_rule_widening(errors, row)
        for row in rows(data, "new_rule"):
            verify_new_rule(errors, row)

    if errors:
        print("FAIL maximal-widening")
        for error in errors:
            print(f"- {error}")
        return 1

    print("PASS maximal-widening")
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
