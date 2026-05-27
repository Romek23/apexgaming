from pydantic import BaseModel, EmailStr, Field


# Дані, які користувач надсилає під час реєстрації.
class UserRegister(BaseModel):
    name: str = Field(min_length=1, max_length=100)
    email: EmailStr
    password: str = Field(min_length=6, max_length=128)


# Дані, які користувач надсилає під час входу.
class UserLogin(BaseModel):
    email: EmailStr
    password: str = Field(min_length=1, max_length=128)


# Дані користувача, які бекенд повертає на фронтенд.
# Тут немає password_hash, бо пароль не можна віддавати клієнту.
class UserResponse(BaseModel):
    id: int
    name: str
    email: EmailStr
    avatar_url: str | None = None

    class Config:
        # Дозволяє Pydantic читати дані прямо з SQLAlchemy-моделі User.
        from_attributes = True


# Відповідь після успішного входу або реєстрації.
class AuthResponse(BaseModel):
    access_token: str
    token_type: str = "bearer"
    user: UserResponse


# Дані для оновлення аватара профілю.
class AvatarUpdate(BaseModel):
    avatar_url: str | None = None
