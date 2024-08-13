from sqlalchemy.orm import sessionmaker

from db.init_db import engine


SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)