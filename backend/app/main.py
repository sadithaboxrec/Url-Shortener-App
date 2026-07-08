from fastapi import FastAPI

from app.api.health import router as health_router
from app.api.auth import router as auth_router
from app.api import urls


app = FastAPI(
    title="URL Shortener API",
    version="1.0.0",
)

app.include_router(health_router)
app.include_router(auth_router)
app.include_router(urls.router)