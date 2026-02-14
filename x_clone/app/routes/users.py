from fastapi import APIRouter, Depends, HTTPException
from app.utils.dependencies import get_current_user
from app.models.user import User

from sqlalchemy.orm import Session
from app.database import get_db
from app.models.tweet import Tweet
from app.models.follow import Follow

router = APIRouter(
    prefix="/users",
    tags=["Users"]
)


@router.get("/me")
def read_current_user(current_user: User = Depends(get_current_user)):
    return {
        "id": current_user.id,
        "username": current_user.username,
        "email": current_user.email,
        "full_name": current_user.full_name,
        "bio": current_user.bio,
        "created_at": current_user.created_at
    }


@router.get("/{user_id}")
def get_user_profile(user_id: int, db: Session = Depends(get_db)):
    user = db.query(User).filter(User.id == user_id).first()
    if not user:
        raise HTTPException(status_code=404, detail="User not found")
    
    tweets_count = db.query(Tweet).filter(Tweet.user_id == user_id).count()
    followers_count = db.query(Follow).filter(Follow.followed_id == user_id).count()
    following_count = db.query(Follow).filter(Follow.follower_id == user_id).count()

    return {
        "id": user.id,
        "username": user.username,
        "email": user.email,
        "full_name": user.full_name,
        "bio": user.bio,
        "created_at": user.created_at,
        "tweets_count": tweets_count,
        "followers_count": followers_count,
        "following_count": following_count
    }
