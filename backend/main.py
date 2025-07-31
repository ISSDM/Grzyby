from fastapi import FastAPI, Depends, HTTPException, Query
from fastapi.middleware.cors import CORSMiddleware
from sqlalchemy.orm import Session
from typing import List, Optional

from database import Base, engine, get_db
import crud
from schemas import (
    UserCreate, Token,
    MushroomCreate, MushroomUpdate, MushroomOut
)
from auth import authenticate_user, create_access_token, get_password_hash, get_current_user

app = FastAPI()

# --- Ustaw CORS raz, na samym początku! ---
app.add_middleware(
    CORSMiddleware,             # <- to jest middleware_class
    allow_origins=["http://localhost:3001"],  # <-- twój React na porcie 3001
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Stwórz tabele
Base.metadata.create_all(bind=engine)


# ——— AUTH —————————————————————————————————————————————

@app.post("/register", response_model=Token)
def register(user: UserCreate, db: Session = Depends(get_db)):
    if crud.get_user_by_email(db, user.email):
        raise HTTPException(400, "Email already registered")
    hashed_pw = get_password_hash(user.password)
    new = crud.create_user(db, user.email, hashed_pw)
    token = create_access_token(new.email)
    return {"access_token": token, "token_type": "bearer"}


@app.post("/login", response_model=Token)
def login(form_data=Depends(), db: Session = Depends(get_db)):
    user = authenticate_user(db, form_data.username, form_data.password)
    if not user:
        raise HTTPException(400, "Invalid credentials")
    return {"access_token": create_access_token(user.email), "token_type": "bearer"}


@app.post("/logout")
def logout():
    return {"message": "Logged out"}


# ——— MUSHROOMS ————————————————————————————————————————

@app.get("/mushrooms", response_model=List[MushroomOut])
def read_mushrooms(
    skip: int = 0,
    limit: int = 100,
    category: Optional[str] = Query(None),
    sort_by: Optional[str] = Query(None),
    db: Session = Depends(get_db)
):
    return crud.get_mushrooms(db, skip, limit, category, sort_by)


@app.post("/mushrooms", response_model=MushroomOut)
def create_mushroom(
    m: MushroomCreate,
    db: Session = Depends(get_db),
    # jeśli chcesz autoryzację, odkomentuj:
    # current_user=Depends(get_current_user)
):
    return crud.create_mushroom(db, m)


@app.put("/mushrooms/{mushroom_id}", response_model=MushroomOut)
def update_mushroom(mushroom_id: int, m: MushroomUpdate, db: Session = Depends(get_db)):
    out = crud.update_mushroom(db, mushroom_id, m)
    if not out:
        raise HTTPException(404, "Not found")
    return out


@app.delete("/mushrooms/{mushroom_id}")
def delete_mushroom(mushroom_id: int, db: Session = Depends(get_db)):
    if not crud.delete_mushroom(db, mushroom_id):
        raise HTTPException(404, "Not found")
    return {"message": "Deleted"}
