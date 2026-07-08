import secrets
import string

from sqlalchemy.ext.asyncio import AsyncSession

# to prevent collisions
from sqlalchemy import select

from app.db.models import URL, User


def generate_short_code(length: int = 6) -> str:
    characters = (
        string.ascii_letters +
        string.digits
    )

    return "".join(
        secrets.choice(characters)
        for _ in range(length)
    )



# async def create_short_url(
#     db: AsyncSession,
#     original_url: str,
#     user: User | None = None,
# ) -> URL:

#     short_code = generate_short_code()

#     url = URL(
#         short_code=short_code,
#         original_url=original_url,
#         user_id=user.id if user else None,
#     )

#     db.add(url)

#     await db.commit()
#     await db.refresh(url)

#     return url

async def create_short_url(
    db: AsyncSession,
    original_url: str,
    user: User | None = None,
) -> URL:

    while True:
        short_code = generate_short_code()

        result = await db.execute(
            select(URL).where(
                URL.short_code == short_code
            )
        )

        existing = result.scalar_one_or_none()

        if existing is None:
            break

    url = URL(
        short_code=short_code,
        original_url=original_url,
        user_id=user.id if user else None,
    )

    db.add(url)

    await db.commit()
    await db.refresh(url)

    return url




## to redirect the url

from fastapi import HTTPException, status
from sqlalchemy import select


async def get_url_by_short_code(
    db: AsyncSession,
    short_code: str,
) -> URL:

    result = await db.execute(
        select(URL).where(
            URL.short_code == short_code
        )
    )

    url = result.scalar_one_or_none()

    if url is None:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Short URL not found",
        )

    return url




# get urls allocated to user


async def get_user_urls(
    db: AsyncSession,
    user: User,
) -> list[URL]:

    result = await db.execute(
        select(URL)
        .where(URL.user_id == user.id)
        .order_by(URL.created_at.desc())
    )

    return list(result.scalars().all())