from fastapi import Depends, HTTPException, APIRouter
from fastapi.security import HTTPBearer, HTTPAuthorizationCredentials

from core.utils import supabase


# Security scheme for JWT authentication
security = HTTPBearer()

router = APIRouter()

@router.get('/profile', tags=['user'])
async def get_profile(credentials: HTTPAuthorizationCredentials = Depends(security)):
    try:
        # Verify the token and get the user
        user = supabase.auth.get_user(credentials.credentials).dict()['user']
            
        # Fetch the user's profile
        profile_response = supabase.from_("profiles").select("*").eq("user_id", user['id']).execute()
        
        if not profile_response.data:
            raise HTTPException(status_code=404, detail="Profile not found")
        
        return profile_response.data[0]
    except Exception as e:
        raise HTTPException(status_code=401, detail=str(e))