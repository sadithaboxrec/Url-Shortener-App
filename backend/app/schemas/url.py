# after login implementation

from datetime import datetime

from pydantic import BaseModel, HttpUrl, ConfigDict


class URLCreateRequest(BaseModel):
    original_url: HttpUrl


class URLResponse(BaseModel):
    model_config = ConfigDict(
        from_attributes=True
    )

    id: int
    short_code: str
    original_url: str
    created_at: datetime