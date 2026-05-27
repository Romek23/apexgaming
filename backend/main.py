from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from app.database import Base, engine
from app.routes.auth import router as auth_router
from app.routes.users import router as users_router

Base.metadata.create_all(bind=engine)

app = FastAPI(
    title="ApexGaming API",
    description="Gaming PC Store API",
    version="1.0.0"
)

# Дозволяємо фронтенду звертатися до бекенду з локального браузера.
origins = [
    "http://localhost:5173",
    "http://localhost:3000",
]

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
    return {"status": "ok"}

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)
