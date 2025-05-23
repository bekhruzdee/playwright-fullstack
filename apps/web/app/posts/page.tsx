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
    <div className="min-h-screen bg-gray-100 p-6">
      <div className="max-w-2xl mx-auto">
        <h1 className="text-4xl font-bold text-center text-blue-700 mb-6">Posts Page</h1>

        {/* Toast-like message */}
        {message && (
          <div className="bg-green-100 text-green-800 px-4 py-2 rounded mb-4 shadow">
            {message}
          </div>
        )}

        {/* Form block */}
        <form onSubmit={handleSubmit} className="bg-white rounded shadow p-6 mb-8 space-y-4">
          <h2 className="text-2xl font-semibold text-gray-800">Add New Post</h2>
          <div>
            <input
              type="text"
              placeholder="Title"
              className="border rounded px-3 py-2 w-full focus:outline-none focus:ring-2 focus:ring-blue-400"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
            />
          </div>
          <div>
            <textarea
              placeholder="Content"
              className="border rounded px-3 py-2 w-full h-24 focus:outline-none focus:ring-2 focus:ring-blue-400"
              value={content}
              onChange={(e) => setContent(e.target.value)}
              required
            />
          </div>
          <button
            type="submit"
            className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition"
          >
            Add Post
          </button>
        </form>

        {/* Posts list */}
        {posts.length === 0 ? (
          <p className="text-center text-gray-600">No posts available yet.</p>
        ) : (
          <ul className="space-y-4">
            {posts.map((post) => (
              <li
                key={post.id}
                className="bg-white p-4 rounded shadow hover:shadow-md transition"
              >
                <h3 className="text-xl font-bold text-gray-800">{post.title}</h3>
                <p className="mt-2 text-gray-700">{post.content}</p>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}
