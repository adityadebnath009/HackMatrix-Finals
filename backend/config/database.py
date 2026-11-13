import urllib.parse
from typing import AsyncGenerator

from sqlalchemy.ext.asyncio import AsyncSession, async_sessionmaker, create_async_engine

from backend.config.settings import get_settings

settings = get_settings()


def format_neon_async_url(raw_url: str) -> str:
    """Sanitizes Neon PostgreSQL connection strings for asyncpg driver."""
    if not raw_url:
        return ""

    # Ensure asyncpg driver
    if raw_url.startswith("postgresql://"):
        raw_url = raw_url.replace("postgresql://", "postgresql+asyncpg://", 1)

    parts = urllib.parse.urlsplit(raw_url)
    query_params = urllib.parse.parse_qs(parts.query)

    # asyncpg expects ssl=require rather than libpq sslmode/channel_binding
    clean_params = {}
    if "sslmode" in query_params or "ssl" in query_params:
        clean_params["ssl"] = "require"

    clean_query = urllib.parse.urlencode(clean_params)
    return urllib.parse.urlunsplit((
        parts.scheme,
        parts.netloc,
        parts.path,
        clean_query,
        parts.fragment
    ))


# Choose pooled connection string if available, otherwise standard DATABASE_URL
target_db_url = settings.DATABASE_URL_POOLED or settings.DATABASE_URL
async_db_url = format_neon_async_url(target_db_url)

engine = None
AsyncSessionLocal = None

if async_db_url:
    engine = create_async_engine(
        async_db_url,
        echo=settings.DEBUG,
        pool_pre_ping=True,
        pool_size=10,
        max_overflow=20
    )
    AsyncSessionLocal = async_sessionmaker(
        bind=engine,
        class_=AsyncSession,
        expire_on_commit=False,
        autocommit=False,
        autoflush=False
    )


async def get_db_session() -> AsyncGenerator[AsyncSession, None]:
    """FastAPI dependency for repository database transactions."""
    if not AsyncSessionLocal:
        raise RuntimeError("Neon DATABASE_URL is not configured in settings.")

    async with AsyncSessionLocal() as session:
        try:
            yield session
            await session.commit()
        except Exception:
            await session.rollback()
            raise
        finally:
            await session.close()
