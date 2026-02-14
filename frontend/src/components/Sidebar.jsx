import { Link, useNavigate } from "react-router-dom";

export default function Sidebar() {
    const navigate = useNavigate();

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
                <button onClick={logout} className="text-left hover:text-blue-500">
                    🚪 Logout
                </button>
            </nav>
        </aside>
    );
}
