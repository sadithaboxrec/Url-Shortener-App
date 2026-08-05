<img width="1918" height="900" alt="Screenshot 2026-08-05 233740" src="https://github.com/user-attachments/assets/bb9f1698-150f-4922-9365-800a40017a29" />
<img width="1918" height="928" alt="Screenshot 2026-08-05 233807" src="https://github.com/user-attachments/assets/d48b4479-c9cd-482b-a419-5943d340e2de" />
<img width="1918" height="911" alt="Screenshot 2026-08-05 233845" src="https://github.com/user-attachments/assets/36bc1a07-1d55-4d8a-b567-d4407934385a" />
<img width="1918" height="911" alt="Screenshot 2026-08-05 233915" src="https://github.com/user-attachments/assets/cc3aae6e-a818-4889-b8cd-1e4df8cb3994" />


# Shortly — URL Shortener

A modern full-stack URL shortener built with FastAPI and React.

Shortly lets users create compact links, generate downloadable QR codes, track clicks, and manage saved links through a responsive dashboard.

## Features

- Create short URLs without an account
- Register and log in securely
- Save links to a personal dashboard
- Track link click counts
- View simple analytics and rankings
- Generate and download QR codes as PNG images
- Redis-based rate limiting
- Responsive desktop and mobile interface
- Docker-based development environment

## Tech Stack

### Backend

- FastAPI
- PostgreSQL
- SQLAlchemy
- Alembic
- Redis
- Argon2 password hashing
- Cookie-based sessions

### Frontend

- React
- TypeScript
- Vite
- Tailwind CSS
- TanStack React Query
- Axios
- Recharts
- QR Code React

## Project Structure

```text
Url-Shortener/
├── backend/              # FastAPI application
│   ├── app/
│   │   ├── api/          # API routes
│   │   ├── core/         # Configuration, security, Redis
│   │   ├── db/           # Database models and connection
│   │   ├── schemas/      # Request and response schemas
│   │   └── services/     # Business logic
│   └── migrations/       # Alembic migrations
├── frontend/             # React application
│   └── src/
│       ├── api/
│       ├── components/
│       ├── contexts/
│       ├── pages/
│       └── routes/
├── docker-compose.yml
└── ARCHITECTURE.md
```

## Running with Docker

### 1. Configure the backend

Create `backend/.env`:

```env
DATABASE_USER=postgres
DATABASE_PASSWORD=postgres
DATABASE_NAME=url_shortener
DATABASE_HOST=db
DATABASE_PORT=5432

SESSION_SECRET=replace-with-a-secure-random-value

GOOGLE_CLIENT_ID=
GOOGLE_CLIENT_SECRET=

REDIS_HOST=redis
REDIS_PORT=6379

FRONTEND_URL=http://localhost:5173
```

You can generate a secure session secret with:

```powershell
python -c "import secrets; print(secrets.token_urlsafe(48))"
```

### 2. Start the services

```powershell
docker compose up --build -d
```

### 3. Run database migrations

```powershell
docker compose exec backend alembic upgrade head
```

### 4. Open the application

- Frontend: http://localhost:5173
- Backend API: http://localhost:8000
- API documentation: http://localhost:8000/docs

## Useful Commands

View running services:

```powershell
docker compose ps
```

Follow logs:

```powershell
docker compose logs -f frontend backend redis db
```

Restart the frontend:

```powershell
docker compose restart frontend
```

Stop all services:

```powershell
docker compose down
```

Stop services and remove database data:

```powershell
docker compose down -v
```

> Warning: the last command permanently deletes the PostgreSQL Docker volume.

## Rate Limiting

URL creation is currently limited to:

- 2 links per 30 seconds for guests
- 2 links per 30 seconds for logged-in users

Guest requests are tracked by IP address. Authenticated requests are tracked by user ID.

## Authentication

Authentication uses server-side database sessions.

After login, the backend stores a secure random session ID in an HttpOnly cookie. Protected routes use this cookie to identify the current user.

## Click Tracking

Opening a short URL:

```text
http://localhost:8000/urls/{short_code}
```

increments its click count before redirecting the visitor to the original destination.

Click counts are only available to the logged-in owner of the link.

## Architecture

For a detailed explanation of the backend, frontend, database, Redis, Docker networking, and request flows, see [ARCHITECTURE.md](./ARCHITECTURE.md).

## Current Limitations

- Profile editing is not available yet
- Links cannot currently be edited or deleted
- Analytics store aggregate click counts only
- Guest-created links cannot be claimed after registration
- Custom aliases are not implemented yet

## License

This project is available for learning and personal development.
