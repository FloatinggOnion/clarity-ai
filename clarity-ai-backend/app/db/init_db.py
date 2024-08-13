from sqlalchemy import create_engine

DATABASE_URL = "sqlite:///./test_db"

# connect_args param is only needed for sqlite
engine = create_engine(
    DATABASE_URL, connect_args={'check_same_thread': False}
)