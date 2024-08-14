from sqlalchemy.orm import Session
from pydantic import EmailStr

from models.user import User

from schemas.user import UserCreate

from core.utils import supabase

from datetime import datetime, timedelta
from dotenv import load_dotenv
import os

load_dotenv()


def create_user(user: UserCreate):
    auth_response = supabase.auth.sign_up(credentials={'email': user.email, 'password': user.password})
    if auth_response is None:
        raise Exception("User creation failed")

    profile_response = supabase.from_('Profiles').update({'is_onboarded': False, 'subscription_tier': None}).eq('user_id', auth_response.user.id).execute()
    print(profile_response)
    
    response = {
        "user_id": auth_response.user.id,
        "email": auth_response.user.email,
        "profile": profile_response.data[0] if profile_response.data else None
    }
    
    return response


def authenticate_user(email: EmailStr, password: str):
    try:
        auth_response = supabase.auth.sign_in_with_password(credentials={'email': email, 'password': password})
        
        if auth_response.user is None:
            raise Exception("Invalid credentials")
        
        profile_response = supabase.from_('profiles').select('*').eq('user_id', auth_response.user.id).execute()
        
        return {
            'access_token': auth_response.session.access_token,
            'token_type': 'bearer',
            'user_id': auth_response.user.id,
            'profile': profile_response.data[0] if profile_response.data else None,
        }
        
    except Exception as e:
        raise Exception("Authentication failed: " + str(e))
    
    
async def signout_user():
    return await supabase.auth.sign_out()


async def retrieve_session():
    return await supabase.auth.get_session()

async def refresh_session():
    return await supabase.auth.refresh_session()