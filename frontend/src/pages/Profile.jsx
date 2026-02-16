import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import API from "../services/api";
import TweetCard from "../components/TweetCard";
import Layout from "../components/Layout";

export default function Profile() {
    const { id } = useParams();
    const [user, setUser] = useState(null);
    const [tweets, setTweets] = useState([]);
    const [isFollowing, setIsFollowing] = useState(false);

    useEffect(() => {
        fetchProfile();
        fetchTweets();
        fetchFollowStatus();
        fetchProfile()
    }, [id]);

    const fetchProfile = async () => {
        const res = await API.get(`/users/${id}`);
        setUser(res.data);
    };

    const fetchTweets = async () => {
        const res = await API.get(`/tweets/user/${id}`);
        setTweets(res.data);
    };

    const fetchFollowStatus = async () => {
        const res = await API.get(`/follows/status/${id}`);
        setIsFollowing(res.data.following);
    };

    const toggleFollow = async () => {
        if (isFollowing) {
            await API.delete(`/follows/${id}`);
        } else {
            await API.post(`/follows/${id}`);
        }

        setIsFollowing(!isFollowing);
    }

    const currentUserId = JSON.parse(atob(localStorage.getItem("token").split(".")[1])).user_id;

    if (!user) return <p className="text-center mt-10">Loading...</p>;

    return (
        <Layout>
            <div className="p-4">
                <img
                    src={user.avatar || "/default-avatar.png"}
                    className="w-20 h-20 rounded-full mb-2"
                />
                
                <div className="border-b pb-4 mb-4">
                    <h1 className="text-2xl font-bold">@{user.username}</h1>
                    <p className="text-gray-600">{user.bio || "No bio yet"}</p>

                    <div className="flex gap-4 mt-3 text-sm">
                        <span><strong>{user.tweets}</strong> Tweets</span>
                        <span><strong>{user.followers}</strong> Followers</span>
                        <span><strong>{user.following}</strong> Following</span>
                    </div>

                    {/* Follow button comes next here */}
                    {currentUserId !== Number(id) && (
                        <button
                            onClick={toggleFollow}
                            className={`mt-3 px-4 py-1 rounded ${
                                isFollowing
                                    ? "border text-gray-700"
                                    : "bg-blue-500 text-white"
                            }`}
                        >
                            {isFollowing ? "Unfollow" : "Follow"}
                        </button>
                    )}
                </div>

                {tweets.map((t) => (
                    <TweetCard key={t.id} tweet={t} onUpdate={fetchTweets} />
                ))}

                <button
                    onClick={() => Navigate("/edit-profile")}
                    className="mt-3 border px-4 py-1 rounded"
                >
                    Edit Profile
                </button>
            </div>
        </Layout>
    );
}
