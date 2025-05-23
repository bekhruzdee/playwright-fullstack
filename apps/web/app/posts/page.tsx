"use client";

import { useEffect, useState } from "react";

interface Post {
  id: number;
  title: string;
  content: string;
}

export default function PostsPage() {
  const [posts, setPosts] = useState<Post[]>([]);
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [message, setMessage] = useState("");

  const fetchPosts = async () => {
    const res = await fetch("/api/posts");
    const data = await res.json();
    setPosts(data);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await fetch("/api/posts", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ title, content }),
    });
    setTitle("");
    setContent("");
    setMessage("Post added successfully!");
    fetchPosts();
    setTimeout(() => setMessage(""), 3000);
  };

  useEffect(() => {
    fetchPosts();
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-tr from-purple-100 via-white to-blue-100 p-6">
      <div className="max-w-3xl mx-auto">
        <h1 className="text-5xl font-extrabold text-center text-purple-700 mb-10 tracking-tight">
          Posts Page
        </h1>

        {message && (
          <div className="bg-green-100 text-green-900 px-6 py-3 rounded-lg mb-6 shadow-md text-center font-medium animate-fadeIn">
            {message}
          </div>
        )}

        <form
          onSubmit={handleSubmit}
          className="bg-white rounded-2xl shadow-lg p-8 mb-12 space-y-6 max-w-xl mx-auto"
        >
          <h2 className="text-3xl font-semibold text-gray-900 mb-4">
            Add New Post
          </h2>
          <div>
            <input
              type="text"
              placeholder="Title"
              className="border border-gray-300 rounded-lg px-4 py-3 w-full text-lg placeholder-gray-400 focus:outline-none focus:ring-4 focus:ring-purple-300 transition"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
            />
          </div>
          <div>
            <textarea
              placeholder="Content"
              className="border border-gray-300 rounded-lg px-4 py-3 w-full h-28 text-lg placeholder-gray-400 resize-none focus:outline-none focus:ring-4 focus:ring-purple-300 transition"
              value={content}
              onChange={(e) => setContent(e.target.value)}
              required
            />
          </div>
          <button
            type="submit"
            className="bg-purple-600 text-white px-6 py-3 rounded-lg hover:bg-purple-700 active:bg-purple-800 transition font-semibold w-full"
          >
            Add Post
          </button>
        </form>

        {posts.length === 0 ? (
          <p className="text-center text-gray-500 text-xl font-medium">
            No posts available yet.
          </p>
        ) : (
          <ul className="space-y-8 max-w-3xl mx-auto">
            {posts.map((post) => (
              <li
                key={post.id}
                className="bg-white rounded-2xl shadow-md p-6 hover:shadow-xl transition cursor-pointer"
              >
                <h3 className="text-2xl font-bold text-purple-800">
                  {post.title}
                </h3>
                <p className="mt-3 text-gray-700 leading-relaxed">{post.content}</p>
              </li>
            ))}
          </ul>
        )}
      </div>

      <style jsx>{`
        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: translateY(-10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        .animate-fadeIn {
          animation: fadeIn 0.5s ease forwards;
        }
      `}</style>
    </div>
  );
}
