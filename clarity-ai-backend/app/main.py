from fastapi import FastAPI, Depends, HTTPException, status
from sqlalchemy.orm import Session
from fastapi.security import OAuth2PasswordBearer, OAuth2PasswordRequestForm
from fastapi.middleware.cors import CORSMiddleware

from models.user import User

from db.session import SessionLocal
from db.init_db import engine

from api.v1.endpoints import auth, users, documents, subscriptions, vectors


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

app.include_router(auth.router, prefix='/api/v1/auth', tags=['auth'])
app.include_router(users.router, prefix='/api/v1/users', tags=['user'])
app.include_router(documents.router, prefix='/api/v1/documents', tags=['documents'])
app.include_router(subscriptions.router, prefix='/api/v1/subscriptions', tags=['subscriptions'])
app.include_router(vectors.router, prefix='/api/v1/vectors', tags=['vectors'])