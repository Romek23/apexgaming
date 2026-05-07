# ApexGaming - Gaming PC Store

Modern e-commerce platform for selling gaming computers. Built with React, FastAPI, and PostgreSQL.

## 🎯 Project Stack

- **Frontend**: React 18 + Vite + Tailwind CSS
- **Backend**: Python FastAPI
- **Database**: PostgreSQL 16
- **DevOps**: Docker + Docker Compose
- **Tools**: Git, Postman, pgAdmin

## 📁 Project Structure

```
apexgaming/
├── frontend/               # React + Vite frontend
│   ├── src/
│   ├── public/
│   └── package.json
├── backend/                # FastAPI backend
│   ├── app/
│   ├── requirements.txt
│   └── main.py
├── database/               # SQL migrations
│   └── migrations/
├── docker/                 # Docker configs
│   ├── Dockerfile.backend
│   ├── Dockerfile.frontend
│   └── docker-compose.yml
├── docs/                   # Documentation
└── README.md
```

## 🚀 Quick Start

### Prerequisites
- Node.js v24.15.0+
- Python 3.13+
- PostgreSQL 16
- Docker & Docker Compose

### Installation

#### 1. Frontend Setup
```bash
cd frontend
npm install
npm run dev
```

#### 2. Backend Setup
```bash
cd backend
python -m venv venv
.\venv\Scripts\activate  # Windows
pip install -r requirements.txt
python main.py
```

#### 3. Database
```bash
# Using pgAdmin or psql
createdb apexgaming
```

## 📚 Documentation

See `/docs` folder for detailed documentation.

## 🔐 Environment Variables

Copy `.env.example` to `.env` and configure:

**Backend**:
```
DATABASE_URL=postgresql://user:password@localhost/apexgaming
SECRET_KEY=your-secret-key
```

**Frontend**:
```
VITE_API_URL=http://localhost:8000
```

## 🎮 Development Commands

| Command | Description |
|---------|-------------|
| `npm run dev` | Start frontend dev server |
| `npm run build` | Build frontend |
| `uvicorn app.main:app --reload` | Start backend server |
| `docker-compose up` | Start all services |

## 📝 License

MIT
