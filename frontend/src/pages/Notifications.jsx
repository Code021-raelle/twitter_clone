import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../services/api";
import Layout from "../components/Layout";

export default function Notifications() {
    const [notifications, setNotifications] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        fetchNotifications();
    }, []);

    const fetchNotifications = async () => {
        const res = await API.get("/notifications");
        setNotifications(res.data);
        await API.post("/notifications/read");
    };

    const handleClick = (n) => {
        if (n.type === "follow") {
            navigate(`/users/${n.actor_id}`);
        }

        if (n.type === "like" || n.type === "retweet") {
            navigate(`/tweets/${n.tweet_id}`);
        }
    };

    const message = (n) => {
        if (n.type === "like") return "liked your tweet";
        if (n.type === "retweet") return "retweeted your tweet";
        if (n.type === "follow") return "started following you";
    };

    return (
        <Layout>
            <div className="p-4">
                <h1 className="text-xl font-bold mb-4">Notifications</h1>

                {notifications.map((n) => (
                    <div
                        key={n.id}
                        onClick={() => handleClick(n)}
                        className={`p-3 border-b cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-900 ${
                            n.is_read ? "opacity-70" : ""
                        }`}
                    >
                        <p>{message(n)}</p>
                        <span className="text-xs text-gray-500">
                            {new Date(n.created_at).toLocaleString()}
                        </span>
                    </div>
                ))}
            </div>
        </Layout>
    );
}
