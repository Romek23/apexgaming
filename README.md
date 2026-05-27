# ApexGaming

ApexGaming is a gaming PC store project with a React frontend, FastAPI backend, and PostgreSQL database. The app includes product/catalog pages, a PC builder, cart logic, authentication, profile pages, and supporting documentation.

## Stack

| Area | Technology |
| --- | --- |
| Frontend | React 18, TypeScript, Vite, Tailwind CSS |
| Backend | Python, FastAPI, SQLAlchemy |
| Database | PostgreSQL 16 |
| Dev tools | Docker Compose, PowerShell scripts, pgAdmin |

## Project Structure

```text
apexgaming/
|-- backend/            # FastAPI app, routes, models, schemas
|-- database/           # Database schema
|-- docker/             # Dockerfiles
|-- docs/               # Setup notes and project documentation
|-- frontend/           # React + Vite client
|-- docker-compose.yml  # PostgreSQL, pgAdmin, backend, frontend services
|-- start.ps1           # Starts local development services
|-- stop.ps1            # Stops local development services
`-- README.md
```

## Quick Start

### Option 1: PowerShell helper

From the repository root:

```powershell
.\start.ps1
```

The script starts PostgreSQL and pgAdmin with Docker Compose, installs missing dependencies, and starts the backend and frontend.

Local URLs:

| Service | URL |
| --- | --- |
| Frontend | `http://localhost:5173` |
| Backend | `http://localhost:8000` |
| API health | `http://localhost:8000/api/health` |
| pgAdmin | `http://localhost:5050` |

To stop local app processes:

```powershell
.\stop.ps1
```

### Option 2: Manual setup

Start the database:

```powershell
docker compose up -d postgres pgadmin
```

Install and run the backend:

```powershell
cd backend
python -m venv venv
.\venv\Scripts\activate
pip install -r requirements.txt
python main.py
```

Install and run the frontend:

```powershell
cd frontend
npm install
npm run dev
```

## Environment

Create `.env` files from the examples if they do not exist:

```powershell
Copy-Item backend\.env.example backend\.env
Copy-Item frontend\.env.example frontend\.env
```

Backend variables:

```env
DATABASE_URL=postgresql://apexgaming:apexgaming_password@127.0.0.1:5433/apexgaming
SECRET_KEY=your-super-secret-key-change-in-production
ALGORITHM=HS256
ACCESS_TOKEN_EXPIRE_MINUTES=30
DEBUG=True
```

Frontend variables:

```env
VITE_API_URL=http://localhost:8000
VITE_APP_NAME=ApexGaming
```

## Common Commands

| Command | Where | Description |
| --- | --- | --- |
| `npm run dev` | `frontend/` | Start Vite dev server |
| `npm run build` | `frontend/` | Build frontend for production |
| `npm run type-check` | `frontend/` | Run TypeScript checks |
| `python main.py` | `backend/` | Start FastAPI backend |
| `docker compose up -d postgres pgadmin` | root | Start database tools |
| `docker compose down` | root | Stop Docker services |

## Git And Deployment Notes

The repository is connected to GitHub:

```text
origin -> https://github.com/Romek23/apexgaming.git
```

Current important branches:

| Branch | Purpose |
| --- | --- |
| `master` | Default remote branch |
| `feature/hero-glow-blue` | Current working branch |

If changes do not appear on the site, check these points:

1. Make sure the latest local commits are pushed:

   ```powershell
   git status --branch
   git push origin feature/hero-glow-blue
   ```

2. Check which branch the hosting service deploys from. If the site deploys from `master`, commits pushed only to `feature/hero-glow-blue` will not appear until they are merged or the deployment branch is changed.

3. After merging into the deploy branch, check the hosting provider build logs for build or environment variable errors.

## Documentation

More setup and project notes are available in:

- `docs/SETUP.md`
- `docs/EXPLANATORY_NOTE.md`

## License

MIT
