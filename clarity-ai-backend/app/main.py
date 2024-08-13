from fastapi import FastAPI, Depends, HTTPException, status
from sqlalchemy.orm import Session
from fastapi.security import OAuth2PasswordBearer, OAuth2PasswordRequestForm
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from jose import JWTError, jwt

from datetime import datetime, timedelta

from models.user import User

from db.session import SessionLocal
from db.init_db import engine


app = FastAPI()

oauth2_scheme = OAuth2PasswordBearer(tokenUrl='token')

origins = [
    'http://localhost:3000',
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
)