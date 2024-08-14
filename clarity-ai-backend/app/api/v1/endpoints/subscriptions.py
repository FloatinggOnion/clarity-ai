from fastapi import Depends, HTTPException, APIRouter
from fastapi.security import HTTPBearer, HTTPAuthorizationCredentials

# Security scheme for JWT authentication
security = HTTPBearer()

router = APIRouter()