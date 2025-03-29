from pydantic import BaseModel, EmailStr,validator
from typing import List, Optional, Literal
from datetime import date,datetime


class ReturnUser(BaseModel):
    email: Optional[str] = None
    first_name : Optional[str] = None
    last_name: Optional[str] = None
    userType: Optional[str] = None
    class Config:
        orm_mode = True
        from_attributes = True  # Enable this to use from_orm