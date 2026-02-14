export default function Trends() {
    return (
        <aside className="w-80 p-4 hidden lg:block">
            <div className="bg-white rounded-xl p-4 shadow-sm">
                <h2 className="font-bold text-lg mb-3">Trends for you</h2>

                <ul className="space-y-3 text-sm">
                    <li>
                        <p className="text-gray-500">Trending</p>
                        <p className="font-semibold">#FastAPI</p>
                    </li>
                    <li>
                        <p className="text-gray-500">Trending</p>
                        <p className="font-semibold">#ReactJS</p>
                    </li>
                    <li>
                        <p className="text-gray-500">Trending</p>
                        <p className="font-semibold">#BuildInPublic</p>
                    </li>
                </ul>
            </div>
        </aside>
    );
}
