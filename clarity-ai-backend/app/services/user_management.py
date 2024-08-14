from sqlalchemy.orm import Session
from pydantic import EmailStr

from schemas.user import UserCreate

from models.user import User

from core.security import pwd_context
from core.utils import supabase


async def get_current_user():
    return await supabase.auth.get_user()