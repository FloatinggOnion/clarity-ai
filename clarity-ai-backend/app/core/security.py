from sqlalchemy.orm import Session
from pydantic import EmailStr
from passlib.context import CryptContext

from models.user import User

from datetime import datetime, timedelta
from dotenv import load_dotenv
import os

load_dotenv()

pwd_context = CryptContext(schemes=['bcrypt'], deprecated='auto')

SECRET_KEY = os.getenv('SECRET_KEY')
ALGORITHM = os.getenv('ALGORITHM')
ACCESS_TOKEN_EXPIRE_MINUTES = os.getenv('ACCESS_TOKEN_EXPIRE_MINUTES')


def authenticate_user(email: EmailStr, password: str, db: Session):
    user = db.query(User).filter(User.email == email).first()
    if not user or not pwd_context.verify(password, user.hashed_password):
        return None
    return user


def create_access_token(data: dict, expires_delta: timedelta = None):
    to_encode = data.copy()
    if expires_delta:
        expire = datetime.utcnow() + expires_delta