from sqlalchemy import Column, Integer, String, Table, Boolean, ForeignKey, DateTime

from db.base import Base
from db.init_db import engine

from .user import User

from datetime import datetime


class Onboarding(Base):
    __tablename__ = 'onboarding'
    
    id = Column(Integer, primary_key=True, index=True)
    user_id = Column(Integer, index=True)
    step_name = Column(String)
    is_completed = Column(Boolean)
    created_at = Column(DateTime, nullable=False)
    
    
    def __init__(self, user_id: int, is_onboarded: bool):
        self.user_id = user_id
        self.is_completed = is_onboarded
        self.created_at = datetime.datetime.now()
        self.updated_at = datetime.datetime.now()
        
    def __repr__(self):
        return f"<Onboarding(user_id={self.user_id}, is_onboarded={self.is_onboarded})>"