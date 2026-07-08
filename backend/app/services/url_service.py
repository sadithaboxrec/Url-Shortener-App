import secrets
import string

from sqlalchemy.ext.asyncio import AsyncSession

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


async def create_short_url(
    db: AsyncSession,
    original_url: str,
    user: User | None = None,
) -> URL:

    short_code = generate_short_code()

    url = URL(
        short_code=short_code,
        original_url=original_url,
        user_id=user.id if user else None,
    )

    db.add(url)

    await db.commit()
    await db.refresh(url)

    return url