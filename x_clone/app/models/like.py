from sqlalchemy import Column, Integer, ForeignKey, UniqueConstraint
from app.database import Base


class Like(Base):
    __tablename__ = "likes"

    id = Column(Integer, primary_key=True)
    user_id = Column(Integer, ForeignKey("users.id", ondelete="CASCADE"))
    tweet_id = Column(Integer, ForeignKey("tweets.id", ondelete="CASCADE"))

    __table_args__ = (
        UniqueConstraint("user_id", "tweet_id", name="unique_like"),
    )
