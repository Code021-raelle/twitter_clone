import { useEffect, useState } from "react";
import API from "../services/api";
import { useNavigate } from "react-router-dom";
import TweetCard from "../components/TweetCard";
import Layout from "../components/Layout";
import { loadConfigFromFile } from "vite";

export default function Feed() {
    const [tweets, setTweets] = useState([]);
    const [content, setContent] = useState("");
    const navigate = useNavigate();

    useEffect(() => {
        if (!localStorage.getItem("token")) navigate("/login");
        fetchTweets();
    }, []);

    const fetchTweets = async () => {
        const res = await API.get("/tweets/feeds");
        setTweets(res.data);
    };

    const postTweet = async () => {
        await API.post("/tweets", { content });
        setContent("");
        fetchTweets();
    };

    return (
        <Layout>
            <div className="p-4">
                <textarea
                    className="w-full border p-2 mb-2"
                    placeholder="What's happening?"
                    value={content}
                    onChange={(e) => setContent(e.target.value)}
                />

                <button onClick={postTweet} className="bg-blue-500 text-white px-4 py-2 mb-4 rounded">
                    Tweet
                </button>

                {tweets.map((t) => (
                    <TweetCard key={t.id} tweet={t} onUpdate={fetchTweets} />
                ))}
            </div>
        </Layout>
    );
}
