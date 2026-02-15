from fastapi import FastAPI
from app.database import engine, Base
from app.models import user, tweet, follow, like, retweet
from app.routes import auth, users, tweets, follows, likes, retweets, notifications

app = FastAPI(title="Twitter Clone API")

@app.on_event("startup")
def startup():
    # Create database tables
    Base.metadata.create_all(bind=engine)

app.include_router(auth.router)
app.include_router(users.router)
app.include_router(tweets.router)
app.include_router(follows.router)
app.include_router(likes.router)
app.include_router(retweets.router)
app.include_router(notifications.router)

@app.get("/")
def root():
    return {"message": "Twitter Clone API is running."}
