"""Database setup shared by API routes.

The module deliberately does not connect to PostgreSQL at import time.  A
Vercel function must be able to import the ASGI application even while a
database is being provisioned or an environment variable is temporarily
missing; database-backed endpoints report that condition as a 503 instead.
"""

import os
from functools import lru_cache
from typing import Generator, Optional

from fastapi import HTTPException, status
from sqlalchemy import create_engine
from sqlalchemy.engine import Engine, make_url
from sqlalchemy.exc import SQLAlchemyError
from sqlalchemy.orm import Session, declarative_base

Base = declarative_base()


class DatabaseUnavailableError(RuntimeError):
    """Raised internally when a database connection cannot be created."""


def _get_database_url() -> Optional[str]:
    """Return the first configured Vercel/Neon connection string."""
    return (
        os.getenv("DATABASE_URL")
        or os.getenv("POSTGRES_URL")
        or os.getenv("POSTGRES_URL_NON_POOLING")
    )


def _normalise_database_url(database_url: str) -> str:
    """Make Postgres URLs SQLAlchemy-compatible and require Neon TLS."""
    url = make_url(database_url)

    if url.drivername == "postgres":
        url = url.set(drivername="postgresql+psycopg2")
    elif url.drivername == "postgresql":
        url = url.set(drivername="postgresql+psycopg2")

    if url.drivername.startswith("postgresql"):
        query = dict(url.query)
        query.setdefault("sslmode", "require")
        url = url.set(query=query)

    return url.render_as_string(hide_password=False)


@lru_cache(maxsize=1)
def get_engine() -> Engine:
    """Create an engine only when a database-backed request needs one."""
    database_url = _get_database_url()
    if not database_url:
        raise DatabaseUnavailableError("Database is not configured")

    return create_engine(
        _normalise_database_url(database_url),
        pool_pre_ping=True,
        pool_recycle=280,
    )


@lru_cache(maxsize=1)
def initialise_database() -> None:
    """Create the application's tables on first database-backed request.

    This preserves the previous development convenience without making a
    Vercel function import (or the independent health endpoint) depend on a
    successful PostgreSQL connection.
    """
    Base.metadata.create_all(bind=get_engine())


def get_db() -> Generator[Session, None, None]:
    """Provide a checked session, converting DB failures to a safe API error."""
    db: Optional[Session] = None
    try:
        initialise_database()
        db = Session(bind=get_engine(), autocommit=False, autoflush=False)
        # Acquire a connection before the route runs so missing/unreachable DBs
        # never become an unhandled server error.
        db.connection()
        yield db
    except (DatabaseUnavailableError, SQLAlchemyError):
        raise HTTPException(
            status_code=status.HTTP_503_SERVICE_UNAVAILABLE,
            detail="Database service is temporarily unavailable",
        ) from None
    finally:
        if db is not None:
            db.close()
