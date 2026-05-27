from sqlalchemy import Column, DateTime, ForeignKey, Integer, String, Text
from sqlalchemy.sql import func

from app.database import Base


# Модель User описує таблицю users у базі даних.
class User(Base):
    __tablename__ = "users"

    id = Column(Integer, primary_key=True, index=True)
    name = Column(String(100), nullable=False)
    email = Column(String(255), unique=True, index=True, nullable=False)
    password_hash = Column(Text, nullable=False)
    avatar_url = Column(Text, nullable=True)
    created_at = Column(DateTime(timezone=True), server_default=func.now())


class SavedBuild(Base):
    __tablename__ = "saved_builds"

    id = Column(Integer, primary_key=True, index=True)
    user_id = Column(Integer, ForeignKey("users.id"), nullable=False, index=True)
    name = Column(String(120), nullable=False)
    total_price = Column(Integer, nullable=False, default=0)
    estimated_wattage = Column(Integer, nullable=False, default=0)
    parts_json = Column(Text, nullable=False)
    created_at = Column(DateTime(timezone=True), server_default=func.now())
