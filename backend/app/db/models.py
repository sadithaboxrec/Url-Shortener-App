from datetime import datetime

from sqlalchemy import String, ForeignKey
from sqlalchemy.orm import DeclarativeBase, Mapped, mapped_column, relationship


class Base(DeclarativeBase):
    pass


class User(Base):
    __tablename__ = "users"

    id: Mapped[int] = mapped_column(
        primary_key=True
    )

    email: Mapped[str] = mapped_column(
        String(255),
        unique=True,
        index=True
    )

    name: Mapped[str | None] = mapped_column(
        String(100),
        nullable=True
    )

    password_hash: Mapped[str | None] = mapped_column(
        nullable=True
    )

    google_id: Mapped[str | None] = mapped_column(
        String(255),
        unique=True,
        nullable=True
    )

    created_at: Mapped[datetime] = mapped_column(
        default=datetime.utcnow
    )

    updated_at: Mapped[datetime] = mapped_column(
        default=datetime.utcnow,
        onupdate=datetime.utcnow
    )


    sessions: Mapped[list["Session"]] = relationship(
        back_populates="user"
    )

    urls: Mapped[list["URL"]] = relationship(
        back_populates="user"
    )


class Session(Base):
    __tablename__ = "sessions"

    id: Mapped[str] = mapped_column(
        String(255),
        primary_key=True
    )

    user_id: Mapped[int] = mapped_column(
        ForeignKey("users.id")
    )

    expires_at: Mapped[datetime]

    created_at: Mapped[datetime] = mapped_column(
        default=datetime.utcnow
    )


    user: Mapped["User"] = relationship(
        back_populates="sessions"
    )


class URL(Base):
    __tablename__ = "urls"

    id: Mapped[int] = mapped_column(
        primary_key=True
    )

    short_code: Mapped[str] = mapped_column(
        String(20),
        unique=True,
        index=True
    )

    original_url: Mapped[str] = mapped_column(
        String(2048)
    )

    click_count: Mapped[int] = mapped_column(
        default=0
    )

    user_id: Mapped[int | None] = mapped_column(
        ForeignKey("users.id"),
        nullable=True
    )

    created_at: Mapped[datetime] = mapped_column(
        default=datetime.utcnow
    )

    expires_at: Mapped[datetime | None] = mapped_column(
        nullable=True
    )


    user: Mapped["User"] = relationship(
        back_populates="urls"
    )