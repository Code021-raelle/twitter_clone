from app.models.notification import Notification
from app.websockets.notifications import manager

async def create_notification(db, recipient_id, actor_id, type, tweet_id=None):
    notification = Notification(
        recipient_id=recipient_id,
        actor_id=actor_id,
        type=type,
        tweet_id=tweet_id
    )
    db.add(notification)
    db.commit()
    db.refresh(notification)
    
    await manager.send(recipient_id, {
        "id": notification.id,
        "actor_id": actor_id,
        "type": type,
        "tweet_id": tweet_id,
        "created_at": str(notification.created_at)
    })
