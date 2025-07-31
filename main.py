from fastapi import FastAPI, Depends, HTTPException, status
from fastapi.security import OAuth2PasswordRequestForm
from sqlalchemy.orm import Session
from fastapi.middleware.cors import CORSMiddleware

from auth import authenticate_user, create_access_token, get_password_hash,  get_current_user
from database import Base, engine, get_db
from models import User
from schemas import UserCreate, Token
import crud

from schemas import MushroomCreate, MushroomUpdate, MushroomOut
from models import Mushroom
from typing import List, Optional
from fastapi import Query
from fastapi import Depends

app = FastAPI()

# Allow frontend (React) to connect
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Create tables
Base.metadata.create_all(bind=engine)

@app.post("/register", response_model=Token)
def register(user: UserCreate, db: Session = Depends(get_db)):
    db_user = crud.get_user_by_email(db, user.email)
    if db_user:
        raise HTTPException(status_code=400, detail="Email already registered")
    hashed_pw = get_password_hash(user.password)
    user = crud.create_user(db, user.email, hashed_pw)
    token = create_access_token(data={"sub": user.email})
    return {"access_token": token, "token_type": "bearer"}

@app.post("/login", response_model=Token)
def login(form_data: OAuth2PasswordRequestForm = Depends(), db: Session = Depends(get_db)):
    user = authenticate_user(db, form_data.username, form_data.password)
    if not user:
        raise HTTPException(status_code=400, detail="Invalid credentials")
    access_token = create_access_token(data={"sub": user.email})
    return {"access_token": access_token, "token_type": "bearer"}

@app.post("/logout")
def logout():
    # Tu można logować zdarzenia wylogowania np. do pliku
    return {"message": "Logged out successfully"}

@app.get("/mushrooms", response_model=List[MushroomOut])
def read_mushrooms(
    skip: int = 0,
    limit: int = 100,
    category: Optional[str] = Query(None),
    sort_by: Optional[str] = Query(None),
    db: Session = Depends(get_db)
):
    return crud.get_mushrooms(db, skip=skip, limit=limit, category=category, sort_by=sort_by)

# POST new mushroom
@app.post("/mushrooms", response_model=MushroomOut)
def create_mushroom(mushroom: MushroomCreate, db: Session = Depends(get_db), current_user: User = Depends(authenticate_user)):
    return crud.create_mushroom(db, mushroom, user_id=current_user.id)

# PUT update
@app.put("/mushrooms/{mushroom_id}", response_model=MushroomOut)
def update_mushroom(mushroom_id: int, mushroom: MushroomUpdate, db: Session = Depends(get_db)):
    db_mushroom = crud.update_mushroom(db, mushroom_id, mushroom)
    if not db_mushroom:
        raise HTTPException(status_code=404, detail="Mushroom not found")
    return db_mushroom

# DELETE
@app.delete("/mushrooms/{mushroom_id}")
def delete_mushroom(mushroom_id: int, db: Session = Depends(get_db)):
    deleted = crud.delete_mushroom(db, mushroom_id)
    if not deleted:
        raise HTTPException(status_code=404, detail="Mushroom not found")
    return {"message": "Deleted"}

@app.post("/mushrooms", response_model=MushroomOut)
def create_mushroom(
    mushroom: MushroomCreate,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user),
):
    return crud.create_mushroom(db, mushroom, user_id=current_user.id)
