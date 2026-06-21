from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from app.routes.auth import router as auth_router
from app.routes.users import router as users_router

app = FastAPI(
    title="ApexGaming API",
    description="Gaming PC Store API",
    version="1.0.0"
)

import os

origins = [
    "http://localhost:5173",
    "http://localhost:3000",
    os.getenv("FRONTEND_URL", ""),
]

origins = [origin for origin in origins if origin]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(auth_router)
app.include_router(users_router)

@app.get("/")
async def root():
    return {"message": "Welcome to ApexGaming API"}

@app.get("/api/health")
async def health():
    # This endpoint intentionally has no database dependency.  It verifies
    # that the Vercel function can import and start FastAPI independently of
    # Neon availability.
    return {"status": "ok", "service": "apexgaming-api"}

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)
