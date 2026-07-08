import asyncio

from app.db.database import AsyncSessionLocal
from app.services.session_service import create_session
from app.db.models import User


async def test():
    async with AsyncSessionLocal() as db:

        user = await db.get(User, 1)

        session = await create_session(
            db,
            user
        )

        print(session.id)
        print(session.expires_at)


asyncio.run(test())