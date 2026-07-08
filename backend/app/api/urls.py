from fastapi import APIRouter, Depends
from sqlalchemy.ext.asyncio import AsyncSession

# redirection
from fastapi.responses import RedirectResponse
from app.services.url_service import get_url_by_short_code

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



# Specific routes first, parameterized routes last.



# getting urls by user

from app.schemas.url import UserURLResponse
from app.core.dependencies import get_current_user
from app.services.url_service import get_user_urls

@router.get(
    "/me",
    response_model=list[UserURLResponse],
)
async def my_urls(
    current_user: User = Depends(get_current_user),
    db: AsyncSession = Depends(get_db),
):
    return await get_user_urls(
        db,
        current_user,
    )


# redirecting the url

@router.get("/{short_code}")
async def redirect_url(
    short_code: str,
    db: AsyncSession = Depends(get_db),
):
    url = await get_url_by_short_code(
        db,
        short_code,
    )

    url.click_count += 1

    await db.commit()

    return RedirectResponse(
        url=url.original_url,
        status_code=307,
    )



