from pydantic import BaseModel, EmailStr, validator, Field
from typing import List, Optional, Literal
from datetime import date, datetime
from schemas.returnSchemas import ReturnUser  # Ensure this path is correct

class CreateUserRequest(BaseModel):  # Registration Schema
    first_name: str
    last_name: str
    email: EmailStr  # Use EmailStr for better validation
    userType: Literal["student", "admin", "teacher"] = "student"  # Restrict userType
    password: str

class Token(BaseModel):  # Token validation schema
    access_token: str
    token_type: str
    UserInfo: ReturnUser

class FormData(BaseModel):  # Fixed typo in class name (FromData -> FormData)
    email: str
    password: str