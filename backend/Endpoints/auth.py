from datetime import timedelta, datetime
from fastapi import APIRouter, HTTPException, Depends
from starlette import status
from typing import Annotated
from passlib.context import CryptContext
from fastapi.security import OAuth2PasswordRequestForm, OAuth2PasswordBearer
from jose import jwt, JWTError
from db.connection import db_dependency
from models import userModels
from models.userModels import Users
from sqlalchemy.orm import Session
from sqlalchemy import or_

from schemas.schemas import CreateUserRequest, Token, FormData, ReturnUser

from dotenv import load_dotenv
import os

# Load environment variables from .env file
load_dotenv()

router = APIRouter(prefix="/auth", tags=["Authentication"])

# Load environment values
SECRET_KEY = os.getenv("SECRET_KEY")
ALGORITHM = os.getenv("ALGORITHM")

# Setup password encryption and token generation
bcrypt_context = CryptContext(schemes=["bcrypt"], deprecated="auto")
oauth2_bearer = OAuth2PasswordBearer(tokenUrl="auth/token")


# Handle register User
@router.post("/register", status_code=status.HTTP_201_CREATED)
async def register_user(db: db_dependency, create_user_request: CreateUserRequest):
    try:
        check_user = db.query(Users).filter(Users.email == create_user_request.email).first()
        if check_user:
            raise HTTPException(status_code=400, detail="Email is already taken")

        # Create the user model
        create_user_model = Users(
            first_name=create_user_request.first_name,
            last_name=create_user_request.last_name,
            email=create_user_request.email,
            userType=create_user_request.userType if create_user_request.userType else "student",
            password=bcrypt_context.hash(create_user_request.password),
        )

        # Add to the database and commit
        db.add(create_user_model)
        db.commit()
        db.refresh(create_user_model)

        return {
            "id": create_user_model.id,
            "first_name": create_user_model.first_name,
            "last_name": create_user_model.last_name,
            "email": create_user_model.email,
            "userType": create_user_model.userType,
        }

    except Exception as e:
        print(f"Error occurred: {e}")
        db.rollback()
        raise HTTPException(status_code=500, detail="Internal server error")


# Login user and create token
@router.post("/login", response_model=Token)
async def login_for_access_token(form_data: FormData, db: db_dependency):
    user = authenticate_user(form_data.email, form_data.password, db)
    if not user:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="No account found with the given credentials",
        )

    token_expires = timedelta(minutes=60 * 24 * 30)  # 30 days
    token = create_access_token(user.email, user.id, token_expires)

    # Serialize the user object to match the ReturnUser schema
    user_info = ReturnUser.from_orm(user)

    return {"UserInfo": user_info, "access_token": token, "token_type": "bearer"}


def authenticate_user(email: str, password: str, db: Session):
    user = db.query(Users).filter(Users.email == email).first()
    if not user or not bcrypt_context.verify(password, user.password):
        return False
    return user


def create_access_token(email: str, user_id: int, expires_delta: timedelta):
    encode = {"email": email, "id": user_id}
    expires = datetime.utcnow() + expires_delta
    encode.update({"exp": expires})
    return jwt.encode(encode, SECRET_KEY, algorithm=ALGORITHM)


async def get_current_user(token: Annotated[str, Depends(oauth2_bearer)]):
    try:
        payload = jwt.decode(token, SECRET_KEY, algorithms=[ALGORITHM])
        email: str = payload.get("email")
        user_id: str = payload.get("id")
        if email is None or user_id is None:
            raise HTTPException(
                status_code=status.HTTP_401_UNAUTHORIZED,
                detail="Authentication required!",
            )
        return {"email": email, "user_id": user_id}
    except JWTError:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Authentication failed. Your token is invalid or has expired. Please re-authenticate.",
        )
