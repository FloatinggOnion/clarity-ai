from db.session import SessionLocal
from db.init_db import engine


# db dependency
def get_db():
    db = SessionLocal()
    try:
        yield db
        
    finally:
        db.close()