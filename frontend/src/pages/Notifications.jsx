import { useEffect, useState } from "react";
import API from "../services/api";
import Layout from "../components/Layout";

export default function Notifications() {
    const [notifications, setNotifications] = useState([]);

    useEffect(() => {
        fetchNotifications();
    }, []);

    const fetchNotifications = async () => {
        const res = await API.get("/notifications");
        setNotifications(res.data);
        await API.post("/notifications/read");
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
                        className={`p-3 border-b ${
                            n.is_read ? "opacity-70" : ""
                        }`}
                    >
                        <p>{message(n)}</p>
                        <span className="text=xs text-gray-500">
                            {new Date(n.created_at).toLocaleString()}
                        </span>
                    </div>
                ))}
            </div>
        </Layout>
    );
}
