import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import API from "../services/api";
import Layout from "../components/Layout";
import TweetCard from "../components/TweetCard";

export default function Tweet() {
    const { id } = useParams();
    const [tweet, setTweet] = useState(null);

    useEffect(() => {
        fetchTweet();
    }, [id]);

    const fetchTweet = async () => {
        const res = await API.get(`/tweets/${id}`);
        setTweet(res.data);
    };

    if (!tweet) return <p className="text-center mt-10 p-4">Loading...</p>;

    return (
        <Layout>
            <div className="p-4">
                <TweetCard tweet={tweet} onUpdate={fetchTweet} />
            </div>
        </Layout>
    );
}
