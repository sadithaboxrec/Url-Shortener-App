# from fastapi import HTTPException, Request, status

# from app.core.redis import redis

# ANONYMOUS_LIMIT = 20
# AUTHENTICATED_LIMIT = 200

# WINDOW_SECONDS = 60 * 60



# from fastapi import HTTPException, Request, status, Depends

# from app.core.redis import redis


# from sqlalchemy import select
# from sqlalchemy.ext.asyncio import AsyncSession

# from app.db.database import get_db
# from app.db.models import Session


# def rate_limit(
#     limit: int,
#     window: int,
#     prefix: str,
# ):

#     # async def dependency(
#     #     request: Request,
#     # ):
#     async def dependency(
#         request: Request,
#         db: AsyncSession = Depends(get_db),
#     ):
        
#         # session_id = request.cookies.get(
#         #     "session_id"
#         # )

#         # client_ip = request.client.host

#         #### adding the user _id instead of sessions


#         if session_id:

#             result = await db.execute(
#                 select(Session).where(
#                     Session.id == session_id
#                 )
#             )

#             session = result.scalar_one_or_none()

#             if session:

#                 key = (
#                     f"rate_limit:"
#                     f"{prefix}:"
#                     f"user:{session.user_id}"
#                 )

#             else:

#                 key = (
#                     f"rate_limit:"
#                     f"{prefix}:"
#                     f"ip:{client_ip}"
#                 )

#         else:

#             key = (
#                 f"rate_limit:"
#                 f"{prefix}:"
#                 f"ip:{client_ip}"
#             )

        
#         #######  

#         if session_id:
#             key = (
#                 f"rate_limit:"
#                 f"{prefix}:"
#                 f"session:{session_id}"
#             )
#         else:
#             key = (
#                 f"rate_limit:"
#                 f"{prefix}:"
#                 f"ip:{client_ip}"
#             )

#         count = await redis.incr(key)

#         if count == 1:
#             await redis.expire(
#                 key,
#                 window,
#             )

#         if count > limit:
#             raise HTTPException(
#                 status_code=status.HTTP_429_TOO_MANY_REQUESTS,
#                 detail="Rate limit exceeded. Please try again later.",
#             )

#     return dependency



from fastapi import Depends, HTTPException, Request, status
from sqlalchemy import select
from sqlalchemy.ext.asyncio import AsyncSession

from app.core.redis import redis
from app.db.database import get_db
from app.db.models import Session


def rate_limit(
    limit: int,
    window: int,
    prefix: str,
):
    async def dependency(
        request: Request,
        db: AsyncSession = Depends(get_db),
    ):
        session_id = request.cookies.get("session_id")
        client_ip = request.client.host

        if session_id:
            result = await db.execute(
                select(Session).where(
                    Session.id == session_id
                )
            )

            session = result.scalar_one_or_none()

            if session:
                key = (
                    f"rate_limit:"
                    f"{prefix}:"
                    f"user:{session.user_id}"
                )
            else:
                key = (
                    f"rate_limit:"
                    f"{prefix}:"
                    f"ip:{client_ip}"
                )
        else:
            key = (
                f"rate_limit:"
                f"{prefix}:"
                f"ip:{client_ip}"
            )

        count = await redis.incr(key)

        if count == 1:
            await redis.expire(key, window)

        if count > limit:
            raise HTTPException(
                status_code=status.HTTP_429_TOO_MANY_REQUESTS,
                detail="Rate limit exceeded. Please try again later.",
            )

    return dependency