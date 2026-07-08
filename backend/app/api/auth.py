from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.ext.asyncio import AsyncSession

from app.db.database import get_db
from app.schemas.auth import SignupRequest, UserResponse
from app.services.auth_service import create_user


# after creating the session_service.py
from fastapi import Response
from app.core.security import verify_password
from app.services.session_service import create_session
from sqlalchemy import select


# after dding auth_service
from app.db.models import User
from app.schemas.auth import LoginRequest
from app.services.auth_service import authenticate_user


router = APIRouter(
    prefix="/auth",
    tags=["Authentication"],
)


@router.post(
    "/signup",
    response_model=UserResponse,
    status_code=status.HTTP_201_CREATED,
)
async def signup(
    data: SignupRequest,
    db: AsyncSession = Depends(get_db),
):
    try:
        user = await create_user(db, data)
        return user

    except ValueError as e:
        raise HTTPException(
            status_code=status.HTTP_409_CONFLICT,
            detail=str(e),
        )
    



@router.post("/login")
async def login(
    data: LoginRequest,
    response: Response,
    db: AsyncSession = Depends(get_db),
):
    try:
        user = await authenticate_user(
            db,
            data.email,
            data.password,
        )

        session = await create_session(
            db,
            user,
        )

        response.set_cookie(
            key="session_id",
            value=session.id,
            httponly=True,
            samesite="lax",
        )

        return {
            "message": "Login successful",
            "user": {
                "id": user.id,
                "email": user.email,
                "name": user.name,
            }
        }

    except ValueError as e:
        raise HTTPException(
            status_code=401,
            detail=str(e),
        )


# @router.post("/login")
# async def login(
#     data: LoginRequest,
#     response: Response,
#     db: AsyncSession = Depends(get_db),
# ):
#     result = await db.execute(
#         select(User).where(
#             User.email == data.email
#         )
#     )

#     user = result.scalar_one_or_none()

#     if not user:
#         raise HTTPException(
#             status_code=401,
#             detail="Invalid credentials"
#         )

#     if not verify_password(
#         data.password,
#         user.password_hash
#     ):
#         raise HTTPException(
#             status_code=401,
#             detail="Invalid credentials"
#         )

#     session = await create_session(
#         db,
#         user
#     )

#     response.set_cookie(
#         key="session_id",
#         value=session.id,
#         httponly=True,
#         samesite="lax",
#     )

#     return {
#         "message": "Login successful"
#     }



# dded after dependncies.py

from app.core.dependencies import get_current_user
from app.db.models import User


@router.get("/me")
async def me(
    current_user: User = Depends(get_current_user),
):
    return {
        "id": current_user.id,
        "email": current_user.email,
        "name": current_user.name,
    }