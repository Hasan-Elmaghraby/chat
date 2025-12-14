import { Link } from "react-router-dom";

export default function Home() {
  return (
    <main className="min-h-screen flex flex-col items-center justify-center bg-gray-50 px-6">
      <div className="max-w-2xl text-center">
        <h1 className="text-4xl font-bold text-gray-900 mb-4">
          Welcome to your Chat App
        </h1>

        <p className="text-gray-600 text-lg leading-relaxed mb-8">
          Start chatting instantly using a simple and fast custom chat
          interface.
        </p>

        <Link
          to="/chat"
          className="inline-block bg-blue-600 text-white px-6 py-3 rounded-lg text-lg font-medium hover:bg-blue-700 transition"
        >
          Go to Chat
        </Link>
      </div>

      <footer className="absolute bottom-6 text-gray-400 text-sm">
        © {new Date().getFullYear()} chat app
      </footer>
    </main>
  );
}
