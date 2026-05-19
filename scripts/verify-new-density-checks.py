#!/usr/bin/env python3
from __future__ import annotations

import json
import tomllib
from pathlib import Path
from typing import Any


ROOT = Path(__file__).resolve().parents[1]
MANIFEST = ROOT / ".plans/2026-05-18-171548-new-density-checks.md.manifest.toml"
PRESET = ROOT / "src/presets/everything.ts"


def read_text(path: Path) -> str:
    return path.read_text(encoding="utf-8")


def rows(data: dict[str, Any], key: str) -> list[dict[str, Any]]:
    value = data.get(key, [])
    if not isinstance(value, list):
        raise TypeError(f"manifest key {key} must be a list")
    return [item for item in value if isinstance(item, dict)]


def require_file(errors: list[str], relative: str) -> str:
    path = ROOT / relative
    if not path.is_file():
        errors.append(f"missing file: {relative}")
        return ""
    return read_text(path)


def verify_rules(errors: list[str], data: dict[str, Any]) -> None:
    package = json.loads(read_text(ROOT / "package.json"))
    exports = package.get("exports", {})
    preset_text = read_text(PRESET)

    for row in rows(data, "new_rule"):
        path = str(row["path"])
        rule_id = str(row["rule_id"])
        policy = str(row["report_policy"])
        registry = str(row["registry"])
        rule_key = str(row["rule_key"])
        package_export = str(row["package_export"])

        text = require_file(errors, path)
        if rule_id not in text:
            errors.append(f"{path} missing rule id {rule_id}")
        if policy == "density" and "defineTextlintRule" not in text:
            errors.append(f"{path} density rule must use defineTextlintRule")
        if policy == "density" and f'kind: "{policy}"' not in text:
            errors.append(f"{path} missing {policy} report policy")
        if policy == "density" and "RuleDetection" not in text:
            errors.append(f"{path} must emit typed detections")
        if policy == "one-to-one" and "oneToOneRule" not in text:
            errors.append(f"{path} one-to-one rule must use oneToOneRule")

        registry_text = require_file(errors, registry)
        if f'"{rule_key}"' not in registry_text:
            errors.append(f"{registry} missing rule key {rule_key}")
        if f'"{rule_key}": true' not in preset_text:
            errors.append(f"src/presets/everything.ts missing {rule_key}")
        if package_export not in exports:
            errors.append(f"package.json missing export {package_export}")


def verify_fixture_text(errors: list[str], data: dict[str, Any]) -> None:
    corpus_text = "\n".join(
        read_text(path)
        for path in sorted((ROOT / "behavior/fixtures/textlint-rules/corpus").glob("*.md"))
    )

    for row in rows(data, "fixture_text"):
        path = str(row["path"])
        text = str(row["text"])
        fixture_text = require_file(errors, path)
        if text not in fixture_text:
            errors.append(f"{path} missing fixture text: {text}")
        if text not in corpus_text:
            errors.append(f"corpus missing fixture text: {text}")


def main() -> int:
    data = tomllib.loads(read_text(MANIFEST))
    errors: list[str] = []

    verify_rules(errors, data)
    verify_fixture_text(errors, data)

    if errors:
        print("FAIL new-density-checks")
        for error in errors:
            print(f"- {error}")
        return 1

    print("PASS new-density-checks")
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
