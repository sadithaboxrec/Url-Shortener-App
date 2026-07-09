from sqlalchemy import select
from sqlalchemy.ext.asyncio import AsyncSession

from app.core.security import hash_password
from app.db.models import User
from app.schemas.auth import SignupRequest


async def create_user(
    db: AsyncSession,
    data: SignupRequest,
) -> User:
    result = await db.execute(
        select(User).where(User.email == data.email)
    )

    existing_user = result.scalar_one_or_none()

    if existing_user:
        raise ValueError("Email already registered")

    user = User(
        name=data.name,
        email=data.email,
        password_hash=hash_password(data.password),
    )

    db.add(user)

    await db.commit()

    await db.refresh(user)

    return user






from sqlalchemy import select

from app.core.security import verify_password


async def authenticate_user(
    db: AsyncSession,
    email: str,
    password: str,
) -> User:

    result = await db.execute(
        select(User).where(User.email == email)
    )

    user = result.scalar_one_or_none()

    if user is None:
        raise ValueError("Invalid email or password")

    if user.password_hash is None:
        raise ValueError(
            "This account uses Google Sign-In."
        )

    if not verify_password(
        password,
        user.password_hash,
    ):
        raise ValueError(
            "Invalid email or password"
        )

    return user



# logout user by deleting the session from the database


from sqlalchemy import delete

from app.db.models import Session


async def delete_session(
    db: AsyncSession,
    session_id: str,
) -> None:

    await db.execute(
        delete(Session).where(
            Session.id == session_id
        )
    )

    await db.commit()    