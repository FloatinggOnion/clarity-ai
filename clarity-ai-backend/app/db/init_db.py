from sqlalchemy import create_engine

from dotenv import load_dotenv
import os

SUPABASE_USER = os.getenv("SUPABASE_USER")
SUPABASE_PASSWORD = os.getenv("SUPABASE_PASSWORD")
SUPABASE_HOST = os.getenv("SUPABASE_HOST")
SUPABASE_PORT = os.getenv("SUPABASE_PORT")
SUPABASE_DB_NAME = os.getenv("SUPABASE_DB_NAME")
SUPABASE_URL = os.getenv("SUPABASE_URL")


DATABASE_URL = f"postgresql://{SUPABASE_USER}:{SUPABASE_PASSWORD}@{SUPABASE_HOST}:{SUPABASE_PORT}/{SUPABASE_DB_NAME}"


engine = create_engine(
    DATABASE_URL
)