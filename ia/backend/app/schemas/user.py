from pydantic import BaseModel, EmailStr
from typing import Optional, List
from datetime import datetime, date
from enum import Enum

class UserRole(str, Enum):
    SUPERADMIN = "superadmin"
    NUTRITIONIST = "nutritionist"
    STUDENT = "student"
    PARENT = "parent"

class Gender(str, Enum):
    M = "M"
    F = "F"

# Schemas para Usuario
class UserBase(BaseModel):
    email: EmailStr
    first_name: str
    last_name: str
    role: UserRole
    institution_id: Optional[int] = None

class UserCreate(UserBase):
    password: str

class UserUpdate(BaseModel):
    email: Optional[EmailStr] = None
    first_name: Optional[str] = None
    last_name: Optional[str] = None
    institution_id: Optional[int] = None
    is_active: Optional[bool] = None

class UserResponse(UserBase):
    id: int
    is_active: bool
    created_at: datetime
    updated_at: datetime

    class Config:
        from_attributes = True

# Schemas para Institución
class InstitutionBase(BaseModel):
    name: str
    address: str
    phone: Optional[str] = None
    email: Optional[EmailStr] = None

class InstitutionCreate(InstitutionBase):
    pass

class InstitutionUpdate(BaseModel):
    name: Optional[str] = None
    address: Optional[str] = None
    phone: Optional[str] = None
    email: Optional[EmailStr] = None
    is_active: Optional[bool] = None

class InstitutionResponse(InstitutionBase):
    id: int
    is_active: bool
    created_at: datetime
    updated_at: datetime

    class Config:
        from_attributes = True

# Schemas para Estudiante
class StudentBase(BaseModel):
    student_code: str
    birth_date: date
    gender: Gender
    weight: Optional[float] = None
    height: Optional[float] = None
    grade: str
    section: Optional[str] = None
    allergies: Optional[str] = None
    special_diet: Optional[str] = None

class StudentCreate(StudentBase):
    user_id: int

class StudentUpdate(BaseModel):
    weight: Optional[float] = None
    height: Optional[float] = None
    grade: Optional[str] = None
    section: Optional[str] = None
    allergies: Optional[str] = None
    special_diet: Optional[str] = None
    is_active: Optional[bool] = None

class StudentResponse(StudentBase):
    id: int
    user_id: int
    is_active: bool
    created_at: datetime
    updated_at: datetime
    user: Optional[UserResponse] = None

    class Config:
        from_attributes = True

# Schemas para Autenticación
class Token(BaseModel):
    access_token: str
    token_type: str
    user: UserResponse

class TokenData(BaseModel):
    email: Optional[str] = None

class LoginRequest(BaseModel):
    email: EmailStr
    password: str