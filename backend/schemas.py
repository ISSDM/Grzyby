from pydantic import BaseModel, EmailStr
from typing import Optional



class UserCreate(BaseModel):
    email: EmailStr
    password: str


class Token(BaseModel):
    access_token: str
    token_type: str


class MushroomBase(BaseModel):
    name: str
    description: str
    category: str
    quantity: int
    status: str


class MushroomCreate(MushroomBase):
    pass


class MushroomUpdate(BaseModel):
    name: Optional[str] = None
    description: Optional[str] = None
    category: Optional[str] = None
    quantity: Optional[int] = None
    status: Optional[str] = None

    class Config:
        from_attributes = True  # dla Pydantic v2


# schemas.py
class MushroomOut(BaseModel):
    id: int
    name: str
    description: str
    category: str
    quantity: int
    status: str
    date_added: str
    last_updated: str

    class Config:
        from_attributes = True  # zamiast orm_mode w Pydantic v2

