from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session

from app.database import get_db
from app.dependencies import get_current_user
from app.models import User
from app.schemas import AvatarUpdate, UserResponse

router = APIRouter(prefix="/api/users", tags=["users"])


@router.get("/me", response_model=UserResponse)
def get_me(current_user: User = Depends(get_current_user)):
    # Повертаємо дані користувача, який зараз увійшов у систему.
    return current_user


@router.patch("/me/avatar", response_model=UserResponse)
def update_avatar(
    payload: AvatarUpdate,
    current_user: User = Depends(get_current_user),
    db: Session = Depends(get_db),
):
    # Оновлюємо аватар поточного користувача і зберігаємо зміни в базі.
    current_user.avatar_url = payload.avatar_url
    db.add(current_user)
    db.commit()
    db.refresh(current_user)
    return current_user
