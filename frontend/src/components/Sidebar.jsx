import { Link, useNavigate } from "react-router-dom";
import { toggleTheme } from "../services/theme";
import useNotifications from "../services/useNotifications";

export default function Sidebar() {
    const navigate = useNavigate();
    const unread = useNotifications();

    const logout = () => {
        localStorage.removeItem("token");
        navigate("/login");
    };

    return (
        <aside className="w-64 p-4 hidden md:block">
            <h1 className="text-2xl font-bold mb-6 text-blue-500">X</h1>

            <nav className="flex flex-col gap-4 text-lg">
                <Link to="/" className="hover:text-blue-500">🏠 Home</Link>
                <Link to="/profile" className="hover:text-blue-500">👤 Profile</Link>
                <Link to="/notifications" className="relative hover:text-blue-500 flex items-center gap-2">
                    🔔 Notifications
                    {unread > 0 && (
                        <span className="bg-red-500 text-white text-xs px-2 py-0.5 rounded-full">
                            {unread}
                        </span>
                    )}
                </Link>
                <button onClick={logout} className="text-left hover:text-blue-500">
                    🚪 Logout
                </button>
                <button
                    onClick={toggleTheme}
                    className="mt-6 text-left hover:text-blue-500 dark:hover:text-yellow-400"
                >
                    🌙 Toggle Theme
                </button>
            </nav>
        </aside>
    );
}
