#!/usr/bin/env python3
"""Valida vinylab.yml contra o schema oficial VinyLab (quando disponível) ou regras mínimas."""
from __future__ import annotations

import json
import sys
from pathlib import Path

try:
    import yaml
except ImportError:
    print("pyyaml obrigatorio", file=sys.stderr)
    sys.exit(2)

ROOT = Path(__file__).resolve().parents[1]
MANIFEST = ROOT / "vinylab.yml"


def main() -> int:
    if not MANIFEST.is_file():
        print("vinylab.yml ausente", file=sys.stderr)
        return 1
    data = yaml.safe_load(MANIFEST.read_text(encoding="utf-8"))
    schema_candidates = [
        Path("/opt/vinylab/docs/standards/vinylab.schema.json"),
        Path("/opt/vinylab/repositories/RepoViniLab/02-standards/vinylab.schema.json"),
    ]
    schema_path = next((p for p in schema_candidates if p.is_file()), None)
    if schema_path:
        try:
            import jsonschema
        except ImportError:
            print("jsonschema obrigatorio", file=sys.stderr)
            return 2
        schema = json.loads(schema_path.read_text(encoding="utf-8"))
        jsonschema.validate(data, schema)
        print(f"manifest-ok schema={schema_path}")
        return 0

    # Fallback mínimo (CI sem checkout do Standard)
    required = ["version", "project", "production", "database", "tests", "backup"]
    for key in required:
        if key not in data:
            print(f"campo obrigatorio ausente: {key}", file=sys.stderr)
            return 1
    if data.get("version") != 1:
        print("version deve ser 1", file=sys.stderr)
        return 1
    if data["project"].get("slug") != "portfolio":
        print("slug esperado: portfolio", file=sys.stderr)
        return 1
    if data["production"].get("domain") != "portfolio.vinichagas.cloud":
        print("domain esperado: portfolio.vinichagas.cloud", file=sys.stderr)
        return 1
    print("manifest-ok fallback")
    return 0


if __name__ == "__main__":
    sys.exit(main())
