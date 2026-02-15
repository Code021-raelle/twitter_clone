import { useEffect, useState } from "react";
import API from "../services/api";

export default function useNotifications() {
    const [unread, setUnread] = useState(0);

    const fetchUnread = async () => {
        try {
            const res = await API.get("/notifications/unread-count");
            setUnread(res.data.count);
        } catch {}
    };

    useEffect(() => {
        fetchUnread();
        window.addEventListener("focus", fetchUnread); // Refresh when tab gains focus

        const interval = setInterval(fetchUnread, 15000); // Refresh every 15 seconds
        return () => {
            clearInterval(interval);
            window.removeEventListener("focus", fetchUnread);
        };
    }, []);

    return unread;
}
