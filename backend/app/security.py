import os
from datetime import datetime, timedelta, timezone

from jose import JWTError, jwt
from passlib.context import CryptContext

SECRET_KEY = os.getenv("SECRET_KEY", "dev-secret")
ALGORITHM = os.getenv("ALGORITHM", "HS256")
ACCESS_TOKEN_EXPIRE_MINUTES = int(os.getenv("ACCESS_TOKEN_EXPIRE_MINUTES", "30"))

pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")


def hash_password(password: str) -> str:
    # Перетворюємо пароль на хеш, щоб не зберігати його відкритим текстом.
    return pwd_context.hash(password)


def verify_password(password: str, password_hash: str) -> bool:
    # Порівнюємо введений пароль із хешем з бази даних.
    return pwd_context.verify(password, password_hash)


def create_access_token(data: dict) -> str:
    # Створюємо JWT-токен, який підтверджує, що користувач увійшов у систему.
    expires_at = datetime.now(timezone.utc) + timedelta(minutes=ACCESS_TOKEN_EXPIRE_MINUTES)
    payload = data.copy()
    payload.update({"exp": expires_at})
    return jwt.encode(payload, SECRET_KEY, algorithm=ALGORITHM)


def decode_access_token(token: str) -> dict | None:
    # Розшифровуємо токен. Якщо він неправильний або прострочений, повертаємо None.
    try:
        return jwt.decode(token, SECRET_KEY, algorithms=[ALGORITHM])
    except JWTError:
        return None
