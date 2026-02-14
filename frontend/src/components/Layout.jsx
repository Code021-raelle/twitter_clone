import Sidebar from "./Sidebar";
import Trends from "./Trends";

export default function Layout([ children ]) {
    return (
        <div className="flex justify-center min-h-screen bg-gray-50">
            <div className="flex w-full max-w-7xl">
                {/* Left */}
                <Sidebar />

                {/* Center */}
                <main className="flex-1 border-x bg-white">
                    {children}
                </main>

                {/* Right */}
                <Trends />
            </div>
        </div>
    );
}
