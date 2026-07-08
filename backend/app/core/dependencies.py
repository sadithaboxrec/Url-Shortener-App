# added after the login implementatattion



from datetime import datetime, timezone

from fastapi import Cookie, Depends, HTTPException, status
from sqlalchemy import select
from sqlalchemy.ext.asyncio import AsyncSession

from app.db.database import get_db
from app.db.models import Session, User


async def get_current_user(
    session_id: str | None = Cookie(default=None),
    db: AsyncSession = Depends(get_db),
) -> User:

    if session_id is None:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Not authenticated",
        )

    result = await db.execute(
        select(Session)
        .where(Session.id == session_id)
    )

    session = result.scalar_one_or_none()

    if session is None:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Invalid session",
        )

    if session.expires_at < datetime.utcnow():
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Session expired",
        )

    return session.user




# here is the optional user dependency, which returns None if the user is not authenticated

async def get_optional_user(
    session_id: str | None = Cookie(default=None),
    db: AsyncSession = Depends(get_db),
) -> User | None:

    if session_id is None:
        return None

    result = await db.execute(
        select(Session).where(Session.id == session_id)
    )

    session = result.scalar_one_or_none()

    if session is None:
        return None

    if session.expires_at < datetime.utcnow():
        return None

    result = await db.execute(
        select(User).where(User.id == session.user_id)
    )

    return result.scalar_one_or_none()