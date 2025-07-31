from sqlalchemy.orm import Session
from models import Mushroom
from schemas import MushroomCreate, MushroomUpdate
from typing import List, Optional

def create_mushroom(db: Session, mushroom: MushroomCreate, user_id: int):
    db_mushroom = Mushroom(**mushroom.dict(), owner_id=user_id)
    db.add(db_mushroom)
    db.commit()
    db.refresh(db_mushroom)
    return db_mushroom

def get_mushrooms(db: Session, skip: int = 0, limit: int = 100, category: Optional[str] = None, sort_by: Optional[str] = None):
    query = db.query(Mushroom)
    if category:
        query = query.filter(Mushroom.category == category)
    if sort_by:
        query = query.order_by(getattr(Mushroom, sort_by))
    return query.offset(skip).limit(limit).all()

def get_mushroom(db: Session, mushroom_id: int):
    return db.query(Mushroom).filter(Mushroom.id == mushroom_id).first()

def update_mushroom(db: Session, mushroom_id: int, mushroom: MushroomUpdate):
    db_mushroom = get_mushroom(db, mushroom_id)
    if not db_mushroom:
        return None
    for key, value in mushroom.dict().items():
        setattr(db_mushroom, key, value)
    db.commit()
    db.refresh(db_mushroom)
    return db_mushroom

def delete_mushroom(db: Session, mushroom_id: int):
    db_mushroom = get_mushroom(db, mushroom_id)
    if not db_mushroom:
        return None
    db.delete(db_mushroom)
    db.commit()
    return db_mushroom
