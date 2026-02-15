from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session

from app.database import get_db
from app.models.follow import Follow
from app.models.user import User
from app.utils.dependencies import get_current_user
from app.utils.notifications import create_notification

router = APIRouter(
    prefix="/follows",
    tags=["Follows"]
)


@router.post("/{user_id}", status_code=status.HTTP_201_CREATED)
def follow_user(
    user_id: int,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user)
):
    if user_id == current_user.id:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="You cannot follow yourself"
        )
    
    target_user = db.query(User).filter(User.id == user_id).first()
    if not target_user:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="User not found"
        )
    
    already_following = db.query(Follow).filter(
        Follow.follower_id == current_user.id,
        Follow.following_id == user_id
    ).first()

    if already_following:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="You are already following this user"
        )
    
    follow = Follow(
        follower_id=current_user.id,
        following_id=user_id
    )

    db.add(follow)
    db.commit()

    create_notification(
        db,
        recipient_id=user_id,
        actor_id=current_user.id,
        type="follow"
    )
    
    return {"message": "Now Following"}


@router.delete("/{user_id}", status_code=status.HTTP_200_OK)
def unfollow_user(
    user_id: int,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user)
):
    follow = db.query(Follow).filter(
        Follow.follower_id == current_user.id,
        Follow.following_id == user_id
    ).first()

    if not follow:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="You are not following this user"
        )
    
    db.delete(follow)
    db.commit()

    return {"message": "Unfollowed successfully"}


@router.get("/status/{user_id}", status_code=status.HTTP_200_OK)
def follow_status(
    user_id: int,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user)
):
    is_following = db.query(Follow).filter_by(
        follower_id=current_user.id,
        following_id=user_id
    ).first() is not None

    return {"following": is_following}
