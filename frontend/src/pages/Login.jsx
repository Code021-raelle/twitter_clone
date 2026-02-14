import { useState } from "react";
import API from "../services/api";
import { useNavigate } from "react-router-dom";

export default function Login() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();

    const handleLogin = async (e) => {
        e.preventDefault();
        try {
            const res = await API.post("/auth/login", { email, password });
            localStorage.setItem("token", res.data.access_token);
            navigate("/");
        } catch {
            alert("Invalid credentials");
        }
    };

    return (
        <div className="h-screen flex items-center justify-center">
            <form onSubmit={handleLogin} className="w-96 p-6 border rounded">
                <h1 className="text-2xl font-bold mb-4">Login</h1>

                <input
                    className="w-full p-2 mb-3 border"
                    placeholder="Email"
                    onChange={(e) => setEmail(e.target.value)}
                />

                <input
                    type="password"
                    className="w-full p-2 mb-3 border"
                    placeholder="Password"
                    onChange={(e) => setPassword(e.target.value)}
                />

                <button className="w-full bg-blue-500 text-white p-2 rounded">
                    Login
                </button>
            </form>
        </div>
    );
}
