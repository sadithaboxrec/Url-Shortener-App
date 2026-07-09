from fastapi import APIRouter
from sqlalchemy import text

from app.db.database import engine

router = APIRouter()


@router.get("/")
def root():
    return {"message": "URL Shortener API"}


@router.get("/health")
async def health():
    try:
        async with engine.connect() as connection:
            connection.execute(text("SELECT 1"))

        return {
            "status": "healthy",
            "database": "connected",
        }

    except Exception as e:
        return {
            "status": "error",
            "database": str(e),
        }
    
from app.core.redis import redis    

@router.get("/redis-test")
async def redis_test():

    await redis.set(
        "hello",
        "world",
    )

    value = await redis.get("hello")

    return {
        "redis": value
    }
