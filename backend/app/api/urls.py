from fastapi import APIRouter, Depends
from sqlalchemy.ext.asyncio import AsyncSession

from app.core.dependencies import get_optional_user
from app.db.database import get_db
from app.db.models import User
from app.schemas.url import URLCreateRequest, URLResponse
from app.services.url_service import create_short_url

router = APIRouter(
    prefix="/urls",
    tags=["URLs"],
)


@router.post(
    "",
    response_model=URLResponse,
)
async def create_url(
    data: URLCreateRequest,
    db: AsyncSession = Depends(get_db),
    current_user: User | None = Depends(get_optional_user),
):
    return await create_short_url(
        db=db,
        original_url=str(data.original_url),
        user=current_user,
    )