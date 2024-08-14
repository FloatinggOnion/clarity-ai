from fastapi import APIRouter, Depends, HTTPException, Response
from fastapi.responses import JSONResponse
from sqlalchemy.orm import Session

from schemas.user import UserCreate, UserLogin

from core.security import create_user, authenticate_user, signout_user

router = APIRouter()

@router.post('/sign-up', tags=['auth'])
async def register_user(user: UserCreate):

    user_response = await create_user(user=user)
    user_response = dict(user_response)
    
    return user_response


@router.post('/login', tags=['auth'])
async def login_user(user: UserLogin):
    try:
        response = authenticate_user(email=user.email, password=user.password)
        
        return response
        
    except Exception as e:
        raise HTTPException(status_code=401, detail=str(e))
    
    
@router.post('/logout', tags=['auth'])
async def logout_user():
    signout_user()
    return {"message": "Logout successful"}