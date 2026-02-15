from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session
from sqlalchemy import or_

from app.database import get_db
from app.models.tweet import Tweet
from app.models.user import User
from app.models.like import Like
from app.models.follow import Follow
from app.schemas.tweet import TweetCreate, TweetResponse
from app.utils.dependencies import get_current_user
from app.models.retweet import Retweet

router = APIRouter(
    prefix="/tweets",
    tags=["Tweets"]
)


@router.post("/", response_model=TweetResponse, status_code=status.HTTP_201_CREATED)
def create_tweet(
    tweet_data: TweetCreate,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user)
):
    if len(tweet_data.content) > 280:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Tweet content exceeds 280 characters"
        )
    
    tweet = Tweet(
        content=tweet_data.content,
        user_id=current_user.id
    )

    db.add(tweet)
    db.commit()
    db.refresh(tweet)

    return tweet


@router.get("/", response_model=list[dict])
def get_all_tweets(db: Session = Depends(get_db)):
    tweets = db.query(Tweet).order_by(Tweet.created_at.desc()).all()
    results = []

    for tweet in tweets:
        likes_count = db.query(Like).filter(Like.tweet_id == tweet.id).count()
        retweets_count = db.query(Retweet).filter(Retweet.tweet_id == tweet.id).count()

        results.append({
            "id": tweet.id,
            "content": tweet.content,
            "user_id": tweet.user_id,
            "created_at": tweet.created_at,
            "likes": likes_count,
            "retweets": retweets_count
        })

    return results


@router.get("/feed", response_model=list[dict])
def get_feed(
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user)
):
    following_ids = db.query(Follow.following_id).filter(
        Follow.follower_id == current_user.id
    )

    tweets = db.query(Tweet).filter(
        or_(
            Tweet.user_id.in_(following_ids),
            Tweet.user_id == current_user.id
        )
    ).order_by(Tweet.created_at.desc()).all()

    results = []
    for tweet in tweets:
        likes_count = db.query(Like).filter(Like.tweet_id == tweet.id).count()
        retweets_count = db.query(Retweet).filter(Retweet.tweet_id == tweet.id).count()

        results.append({
            "id": tweet.id,
            "content": tweet.content,
            "user_id": tweet.user_id,
            "created_at": tweet.created_at,
            "likes": likes_count,
            "retweets": retweets_count
        })

    return results


@router.get("/user/{user_id}", response_model=list[dict])
def get_user_tweets(user_id: int, db: Session = Depends(get_db)):
    tweets = db.query(Tweet).filter(
        Tweet.user_id == user_id
    ).order_by(Tweet.created_at.desc()).all()

    results = []
    for tweet in tweets:
        likes_count = db.query(Like).filter(Like.tweet_id == tweet.id).count()
        retweets_count = db.query(Retweet).filter(Retweet.tweet_id == tweet.id).count()

        results.append({
            "id": tweet.id,
            "content": tweet.content,
            "created_at": tweet.created_at,
            "likes": likes_count,
            "retweets": retweets_count
        })

    return results


@router.get("/{tweet_id}")
def get_tweet(tweet_id: int, db: Session = Depends(get_db)):
    tweet = db.query(Tweet).filter(Tweet.id == tweet_id).first()
    if not tweet:
        raise HTTPException(
            status_code=404,
            detail="Tweet not found"
        )

    likes = db.query(Like).filter(Like.tweet_id == tweet.id).count()
    retweets = db.query(Retweet).filter(Retweet.tweet_id == tweet.id).count()

    return {
        "id": tweet.id,
        "content": tweet.content,
        "user_id": tweet.user_id,
        "created_at": tweet.created_at,
        "likes": likes,
        "retweets": retweets
    }
