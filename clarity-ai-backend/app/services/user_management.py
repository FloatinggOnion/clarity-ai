from sqlalchemy.orm import Session
from pydantic import EmailStr

from schemas.user import UserCreate

from models.user import User

from core.security import pwd_context


def get_user_by_email(db: Session, email: EmailStr):
    return db.query(User).filter(User.email == email).first()

def create_user(db: Session, user: UserCreate):
    hashed_password = pwd_context.hash(user.password)
    db_user = User(email=user.email, hashed_password=hashed_password, is_onboarded=False)
    db.add(db_user)
    db.commit()
    
    return db_user