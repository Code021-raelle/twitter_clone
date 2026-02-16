import { useState } from "react";
import API from "../services/api";
import Layout from "../components/Layout";
import { useNavigate } from "react-router-dom";

export default function EditProfile() {
    const [bio, setBio] = useState("");
    const [avatar, setAvatar] = useState(null);
    const navigate = useNavigate();

    const submit = async (e) => {
        e.preventDefault();

        const form = new FormData();
        if (bio) form.append("bio", bio);
        if (avatar) form.append("avatar", avatar);

        await API.put("/users/me", form, {
            headers: { "Content-Type": "multipart/form-data" }
        });

        navigate("/profile");
    };

    return (
        <Layout>
            <form onSubmit={submit} className="p-4 max-w-xl mx-auto">
                <h1 className="text-xl font-bold mb-4">Edit Profile</h1>

                <label className="block mb-2">Bio</label>
                <textarea
                    className="w-full border p-2 mb-4 dark:bg-black dark:text-white"
                    onChange={(e) => setBio(e.target.value)}
                />

                <label className="block mb-2">Avatar</label>
                <input
                    type="file"
                    accept="image/*"
                    onChange={(e) => setAvatar(e.target.files[0])}
                    className="mb-4"
                />

                <button className="bg-blue=500 text-white px-4 py-2 rounded">
                    Save
                </button>
            </form>
        </Layout>
    );
}
