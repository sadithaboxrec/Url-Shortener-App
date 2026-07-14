from fastapi import FastAPI
# connecting backend to react
from fastapi.middleware.cors import CORSMiddleware



from app.api.health import router as health_router
from app.api.auth import router as auth_router
from app.api import urls

from app.core.config import settings


app = FastAPI(
    title="URL Shortener API",
    version="1.0.0",
)



# react to connect
origins = [
    settings.FRONTEND_URL,
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)
#####################################


app.include_router(health_router)
app.include_router(auth_router)
app.include_router(urls.router)