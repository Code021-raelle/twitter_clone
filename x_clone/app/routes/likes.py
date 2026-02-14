from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session

from app.database import get_db
from app.models.like import Like
from app.models.tweet import Tweet
from app.models.user import User
from app.utils.dependencies import get_current_user

router = APIRouter(
    prefix="/likes",
    tags=["Likes"]
)


@router.post("/{tweet_id}", status_code=status.HTTP_201_CREATED)
def like_tweet(
    tweet_id: int,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user)
):
    tweet = db.query(Tweet).filter(Tweet.id == tweet_id).first()
    if not tweet:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Tweet not found"
        )
    
    already_liked = db.query(Like).filter(
        Like.user_id == current_user.id,
        Like.tweet_id == tweet_id
    ).first()

    if already_liked:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Tweet already liked"
        )
    
    like = Like(
        user_id=current_user.id,
        tweet_id=tweet_id
    )

    db.add(like)
    db.commit()

    return {"message": "Tweet liked"}


@router.delete("/{tweet_id}", status_code=status.HTTP_200_OK)
def unlike_tweet(
    tweet_id: int,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user)
):
    like = db.query(Like).filter(
        Like.user_id == current_user.id,
        Like.tweet_id == tweet_id
    ).first()

    if not like:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Tweet not liked yet"
        )
    
    db.delete(like)
    db.commit()
    
    return {"message": "Tweet unliked"}
