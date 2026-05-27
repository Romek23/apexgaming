# ApexGaming Setup Guide

## 1. Frontend Setup

### Install Dependencies
```bash
cd frontend
npm install
```

### Create .env file
```bash
cp .env.example .env
```

### Start Development Server
```bash
npm run dev
```
Server runs at: `http://localhost:5173`

## 2. Backend Setup

### Create Virtual Environment
```bash
cd backend
python -m venv venv
.\venv\Scripts\activate  # Windows
source venv/bin/activate  # Linux/Mac
```

### Install Dependencies
```bash
pip install -r requirements.txt
```

### Create .env file
```bash
cp .env.example .env
```

### Start Backend Server
```bash
python main.py
# або
uvicorn main:app --reload
```
Server runs at: `http://localhost:8000`

## 3. Database Setup

### Using Docker Compose (Recommended)
```bash
docker-compose up -d postgres pgadmin
```

### Manual Setup
```bash
# Підключитися до PostgreSQL
psql -U postgres

# Створити базу даних
CREATE DATABASE apexgaming;
CREATE USER apexgaming WITH PASSWORD 'apexgaming_password';
GRANT ALL PRIVILEGES ON DATABASE apexgaming TO apexgaming;

# Запустити SQL-схему
psql -U apexgaming -d apexgaming -f database/schema.sql
```

### Access pgAdmin
- URL: `http://localhost:5050`
- Email: `admin@apexgaming.com`
- Password: `admin`

## 4. Testing API

### Using Postman
1. Import Postman collection from `/docs/postman_collection.json`
2. Create environment with:
   - `baseUrl`: `http://localhost:8000`
3. Test endpoints

### Using cURL
```bash
curl http://localhost:8000/
curl http://localhost:8000/api/health
```

## 5. Docker Setup

### Build and Run All Services
```bash
docker-compose up
```

### Stop Services
```bash
docker-compose down
```

### View Logs
```bash
docker-compose logs -f
```

## Troubleshooting

### Port Already in Use
```bash
# Знайти процес, який займає порт 8000
netstat -ano | findstr :8000
# Зупинити процес
taskkill /PID <PID> /F
```

### PostgreSQL Connection Error
- Verify PostgreSQL is running: `Get-Service postgresql*`
- Check credentials in `.env`

### Frontend Module Not Found
```bash
cd frontend
rm -r node_modules package-lock.json
npm install
```
