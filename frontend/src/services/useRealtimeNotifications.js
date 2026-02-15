import { useEffect } from "react";

export default function useRealtimeNotifications(onMessage) {
    useEffect(() => {
        const token = localStorage.getItem("token");
        if (!token) return;

        const socket = new WebSocket(
            `ws://127.0.0.1:8000/ws/notifications?token=${token}`
        );

        socket.onmessage = (event) => {
            const data = JSON.parse(event.data);
            onMessage(data);
        };

        return () => socket.close();
    }, []);
}
