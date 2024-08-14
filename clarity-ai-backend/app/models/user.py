from sqlalchemy import Column, Integer, String, Uuid, Boolean, DateTime
from pydantic import EmailStr
from typing import Optional

from db.base import Base
from db.init_db import engine

import uuid as uuid_pkg


class User(Base):
    __tablename__ = 'users'
    
    id = Column(Uuid, primary_key=True, index=True)     # experiment with default=uuid.uuid4()
    email = Column(String, unique=True, index=True)
    hashed_password = Column(String)
    is_onboarded = Column(Boolean)
    subscription_tier = Column(String)
    created_at = Column(DateTime, nullable=False)
    updated_at = Column(DateTime, nullable=False)
    
    

# create table if it doesn't exist
User.metadata.create_all(bind=engine)