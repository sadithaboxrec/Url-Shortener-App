from datetime import datetime, timedelta, timezone
import secrets

from sqlalchemy.ext.asyncio import AsyncSession

from app.db.models import Session, User


SESSION_DURATION_DAYS = 7


async def create_session(
    db: AsyncSession,
    user: User,
) -> Session:

    session_id = secrets.token_urlsafe(32)

    session = Session(
        id=session_id,
        user_id=user.id,
        expires_at=(
            datetime.now(timezone.utc)
            + timedelta(days=SESSION_DURATION_DAYS)
        ),
    )

    db.add(session)

    await db.commit()

    await db.refresh(session)

    return session