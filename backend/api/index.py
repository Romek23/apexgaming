"""Vercel entry point for the FastAPI application."""

import sys
from pathlib import Path

# A Vercel Python function is loaded from ``backend/api``.  Add the backend
# root explicitly so imports remain valid regardless of the function's
# current working directory.
BACKEND_ROOT = Path(__file__).resolve().parents[1]
if str(BACKEND_ROOT) not in sys.path:
    sys.path.insert(0, str(BACKEND_ROOT))

from main import app

__all__ = ["app"]
