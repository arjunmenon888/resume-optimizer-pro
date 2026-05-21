import os

def ensure_dir(path: str) -> None:
    os.makedirs(path, exist_ok=True)

def sanitize_filename(name: str) -> str:
    return "".join(c for c in name if c.isalnum() or c in ("-", "_", ".")).strip()
