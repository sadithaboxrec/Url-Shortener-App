from redis.asyncio import Redis

from app.core.config import settings

redis = Redis(
    host=settings.redis_host,
    port=settings.redis_port,
    decode_responses=True,
)