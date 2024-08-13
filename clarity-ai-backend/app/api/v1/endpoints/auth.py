from fastapi import APIRouter, Depends, HTTPException
from fastapi.responses import JSONResponse
from sqlalchemy.orm import Session

from dependencies.db import get_db

from schemas.user import UserCreate

from services.user_management import get_user_by_email, create_user

router = APIRouter()

@router.post('register/', tags=['auth'])
def register_user(user: UserCreate, db: Session = Depends(get_db)):
    db_user = get_user_by_email(db=db, email=user.email)
    
    if db_user:
        raise HTTPException(status_code=400, detail="Email already registered")
    
    user_response = create_user(db=db, user=user)
    
    return JSONResponse(content={"message": "User created successfully", "user": user_response}, status_code=201)