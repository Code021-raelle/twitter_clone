import { useState } from "react";
import API from "../services/api";
import { useNavigate } from "react-router-dom";

export default function Register() {
    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();

    const handleRegister = async (e) => {
        e.preventDefault();
        try {
            await API.post("/auth/register", { username, email, password });
            navigate("/login");
        } catch {
            alert("Registration failed");
        }
    };

    return (
        <div className="h-screen flex items-center justify-center">
            <form onSubmit={handleRegister} className="w-96 p-6 border rounded">
                <h1 className="text-2xl font-bold mb-4">Register</h1>

                <input className="w-full p-2 mb-3 border" placeholder="Username"
                    onChange={(e) => setUsername(e.target.value)}
                />

                <input className="w-full p-2 mb-3 border" placeholder="Email"
                    onChange={(e) => setEmail(e.target.value)}
                />

                <input type="password" className="w-full p-2 mb-3 border" placeholder="Password"
                    onChange={(e) => setPassword(e.target.value)}
                />

                <button className="w-full bg-blue-500 text-white p-2 rounded">
                    Register
                </button>
            </form>
        </div>
    );
}
