import json

from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session

from app.database import get_db
from app.dependencies import get_current_user
from app.models import SavedBuild, User
from app.schemas import AvatarUpdate, SavedBuildCreate, SavedBuildResponse, SavedBuildUpdate, UserResponse

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


def serialize_saved_build(build: SavedBuild) -> dict:
    return {
        "id": build.id,
        "name": build.name,
        "total_price": build.total_price,
        "estimated_wattage": build.estimated_wattage,
        "parts": json.loads(build.parts_json),
        "created_at": build.created_at.isoformat() if build.created_at else None,
    }


@router.get("/me/builds", response_model=list[SavedBuildResponse])
def get_saved_builds(
    current_user: User = Depends(get_current_user),
    db: Session = Depends(get_db),
):
    builds = (
        db.query(SavedBuild)
        .filter(SavedBuild.user_id == current_user.id)
        .order_by(SavedBuild.created_at.desc())
        .all()
    )
    return [serialize_saved_build(build) for build in builds]


@router.post("/me/builds", response_model=SavedBuildResponse, status_code=status.HTTP_201_CREATED)
def create_saved_build(
    payload: SavedBuildCreate,
    current_user: User = Depends(get_current_user),
    db: Session = Depends(get_db),
):
    saved_count = db.query(SavedBuild).filter(SavedBuild.user_id == current_user.id).count()
    build_name = payload.name.strip() if payload.name and payload.name.strip() else f"Збірка {saved_count + 1}"

    build = SavedBuild(
        user_id=current_user.id,
        name=build_name,
        total_price=payload.total_price,
        estimated_wattage=payload.estimated_wattage,
        parts_json=json.dumps(payload.parts, ensure_ascii=False),
    )
    db.add(build)
    db.commit()
    db.refresh(build)
    return serialize_saved_build(build)


@router.delete("/me/builds/{build_id}", status_code=status.HTTP_204_NO_CONTENT)
def delete_saved_build(
    build_id: int,
    current_user: User = Depends(get_current_user),
    db: Session = Depends(get_db),
):
    build = (
        db.query(SavedBuild)
        .filter(SavedBuild.id == build_id, SavedBuild.user_id == current_user.id)
        .first()
    )
    if not build:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Build not found")

    db.delete(build)
    db.commit()
    return None


@router.patch("/me/builds/{build_id}", response_model=SavedBuildResponse)
def update_saved_build(
    build_id: int,
    payload: SavedBuildUpdate,
    current_user: User = Depends(get_current_user),
    db: Session = Depends(get_db),
):
    build = (
        db.query(SavedBuild)
        .filter(SavedBuild.id == build_id, SavedBuild.user_id == current_user.id)
        .first()
    )
    if not build:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Build not found")

    build.name = payload.name.strip()
    db.add(build)
    db.commit()
    db.refresh(build)
    return serialize_saved_build(build)
