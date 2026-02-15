from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session

from app.database import get_db
from app.models.retweet import Retweet
from app.models.user import User
from app.models.tweet import Tweet
from app.utils.dependencies import get_current_user
from app.utils.notifications import create_notification

router = APIRouter(
    prefix="/retweets",
    tags=["Retweets"]
)


@router.post("/{tweet_id}", status_code=status.HTTP_201_CREATED)
def retweet(
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

    existing = db.query(Retweet).filter(
        Retweet.user_id == current_user.id,
        Retweet.tweet_id == tweet_id
    ).first()

    if existing:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Tweet already retweeted"
        )

    retweet = Retweet(
        user_id=current_user.id,
        tweet_id=tweet_id
    )

    db.add(retweet)
    db.commit()

    if tweet.user_id != current_user.id:
        create_notification(
            db,
            recipient_id=tweet.user_id,
            actor_id=current_user.id,
            type="retweet",
            tweet_id=tweet.id
        )
        
    return {"message": "Tweet retweeted successfully."}


@router.delete("/{tweet_id}", status_code=status.HTTP_200_OK)
def undo_retweet(
    tweet_id: int,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user)
):
    retweet = db.query(Retweet).filter(
        Retweet.user_id == current_user.id,
        Retweet.tweet_id == tweet_id
    ).first()

    if not retweet:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Retweet not found"
        )

    db.delete(retweet)
    db.commit()

    return {"message": "Retweet undone successfully."}