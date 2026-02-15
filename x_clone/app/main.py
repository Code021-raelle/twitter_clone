from fastapi import FastAPI, WebSocket
from app.database import engine, Base
from app.models import user, tweet, follow, like, retweet
from app.routes import auth, users, tweets, follows, likes, retweets, notifications
from app.websockets.notifications import notifications_socket
from fastapi.staticfiles import StaticFiles

app = FastAPI(title="Twitter Clone API")
app.mount("/media", StaticFiles(directory="media"), name="media")

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


@app.websocket("/ws/notifications")
async def ws_notifications(websocket: WebSocket):
    await notifications_socket(websocket)
