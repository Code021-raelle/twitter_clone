import API from "../services/api";
import { useState } from "react";

export default function TweetCard({ tweet, onUpdate }) {
  const [likes, setLikes] = useState(tweet.likes);
  const [retweets, setRetweets] = useState(tweet.retweets);
  const [liked, setLiked] = useState(false);
  const [retweeted, setRetweeted] = useState(false);

  const toggleLike = async () => {
    try {
        if (liked) {
            await API.delete(`/likes/${tweet.id}`);
            setLikes(likes - 1);
        } else {
            await API.post(`/likes/${tweet.id}`);
            setLikes(likes + 1);
        }
        setLiked(!liked);
        onUpdate();
    } catch {
        alert("Like action failed");
    }
  };

  const toggleRetweet = async () => {
    try {
        if (retweeted) {
            await API.delete(`/retweets/${tweet.id}`);
            setRetweets(retweets - 1);
        } else {
            await API.post(`/retweets/${tweet.id}`);
            setRetweets(retweets + 1);
        }
        setRetweeted(!retweeted);
        onUpdate();
    } catch {
        alert("Retweet action failed");
    }
  };

  return (
    <div className="border-b p-4 hover:bg-gray-50 transition">
        <p
            onClick={() => window.location.href = `/users/${tweet.user_id}`}
            className="cursor-pointer hover:underline text-gray-800"
        >
            {tweet.content}
        </p>

        <div className="flex gap-6 mt-3 text-sm text-gray-600">
            <button
                className={`flex items-center gap-1 ${liked ? 'text-red-500' : ''}`}
                onClick={toggleLike}
            >
                <span>❤️</span>
                <span>{likes}</span>
            </button>

            <button
                className={`flex items-center gap-1 ${retweeted ? 'text-green-500' : ''}`}
                onClick={toggleRetweet}
            >
                <span>🔁</span>
                <span>{retweets}</span>
            </button>
        </div>
    </div>
  );
}
