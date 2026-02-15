from app.models.notification import Notification

def create_notification(db, recipient_id, actor_id, type, tweet_id=None):
    notification = Notification(
        recipient_id=recipient_id,
        actor_id=actor_id,
        type=type,
        tweet_id=tweet_id
    )
    db.add(notification)
    db.commit()
    db.refresh(notification)
    return notification