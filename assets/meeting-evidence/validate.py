#!/usr/bin/env python3
"""Narrow static checks for this example, not a host or full-schema validator."""
import json
import re
import sys
import zipfile
from pathlib import Path

root = Path(__file__).resolve().parent
manifest = json.loads((root / "plugin.json").read_text(encoding="utf-8"))
assert set(manifest) == {"$schema", "name", "version", "description"}
assert manifest["$schema"] == "https://agent-plugins.org/schemas/1.0.0/plugin.schema.json"
assert isinstance(manifest["name"], str) and len(manifest["name"]) <= 64
assert re.fullmatch(r"[a-z0-9]+(?:-[a-z0-9]+)*", manifest["name"])
assert re.fullmatch(r"\d+\.\d+\.\d+", manifest["version"])
assert isinstance(manifest["description"], str) and manifest["description"].strip()
skills = sorted((root / "skills").glob("*/SKILL.md"))
assert len(skills) == 1
for path in root.rglob("*"):
    assert not path.is_symlink(), f"Unexpected symlink: {path}"
for path in skills:
    content = path.read_text(encoding="utf-8")
    pieces = content.split("---", 2)
    assert len(pieces) == 3 and not pieces[0].strip()
    # This example deliberately uses only simple one-line front matter.
    front = dict(line.split(": ", 1) for line in pieces[1].strip().splitlines())
    assert set(front) == {"name", "description"}
    assert front["name"] == path.parent.name
    assert front["description"].strip() and pieces[2].strip()
assert not any((root / name).exists() for name in ("mcp.json", ".mcp.json", ".app.json", "hooks"))
market = json.loads((root / "marketplace.example.json").read_text())
entry = market["plugins"][0]
assert entry["name"] == manifest["name"]
assert entry["source"]["path"] == "./plugins/meeting-evidence"
assert entry["policy"] == {"installation": "AVAILABLE", "authentication": "ON_INSTALL"}
cases = json.loads((root / "tests/cases.json").read_text())
assert len(cases) == 5 and len({case["name"] for case in cases}) == 5
for case in cases:
    assert case["prompt"] and case["expected_checks"]
    if case["input"] is not None:
        assert (root / "tests" / case["input"]).is_file()
files = [root / "plugin.json", *skills]
print("PASS: JSON syntax, expected documented manifest subset, one skill's simple front matter, no MCP/hooks/app declarations, marketplace example, and test fixtures.")
print("NOT TESTED: full external schema, host installation, skill activation, model output, public submission, scans, review, or publication.")
if len(sys.argv) > 1:
    output = Path(sys.argv[1]).resolve()
    assert root not in output.parents, "Write the ZIP outside the source package."
    output.parent.mkdir(parents=True, exist_ok=True)
    with zipfile.ZipFile(output, "w", compression=zipfile.ZIP_DEFLATED) as archive:
        for path in files:
            info = zipfile.ZipInfo(str(path.relative_to(root)), date_time=(2026, 9, 29, 0, 0, 0))
            info.compress_type = zipfile.ZIP_DEFLATED
            info.external_attr = 0o100644 << 16
            archive.writestr(info, path.read_bytes())
    with zipfile.ZipFile(output) as archive:
        assert sorted(archive.namelist()) == sorted(str(path.relative_to(root)) for path in files)
        assert archive.testzip() is None
    print(f"PASS: local ZIP integrity and one root; wrote {output} with {len(files)} runtime files.")
