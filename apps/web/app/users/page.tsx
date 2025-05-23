"use client";

import { useEffect, useState } from "react";

interface User {
  id: number;
  name: string;
  email: string;
}

export default function UsersPage() {
  const [users, setUsers] = useState<User[]>([]);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");

  const fetchUsers = async () => {
    const res = await fetch("/api/users");
    const data = await res.json();
    setUsers(data);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await fetch("/api/users", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name, email }),
    });
    setName("");
    setEmail("");
    setMessage("User added successfully!");
    fetchUsers();
    setTimeout(() => setMessage(""), 3000);
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-r from-indigo-100 via-white to-cyan-100 p-6">
      <div className="max-w-3xl mx-auto">
        <h1 className="text-5xl font-extrabold text-center text-indigo-700 mb-10 tracking-wide">
          Users Page
        </h1>

        {message && (
          <div className="bg-green-100 text-green-900 px-6 py-3 rounded-lg mb-6 shadow-md text-center font-semibold animate-fadeIn">
            {message}
          </div>
        )}

        <form
          onSubmit={handleSubmit}
          className="bg-white rounded-2xl shadow-lg p-8 mb-12 space-y-6 max-w-xl mx-auto"
        >
          <h2 className="text-3xl font-semibold text-gray-900 mb-5">
            Add New User
          </h2>
          <div>
            <input
              type="text"
              placeholder="Name"
              className="border border-gray-300 rounded-lg px-4 py-3 w-full text-lg placeholder-gray-400 focus:outline-none focus:ring-4 focus:ring-indigo-300 transition"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </div>
          <div>
            <input
              type="email"
              placeholder="Email"
              className="border border-gray-300 rounded-lg px-4 py-3 w-full text-lg placeholder-gray-400 focus:outline-none focus:ring-4 focus:ring-indigo-300 transition"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <button
            type="submit"
            className="bg-indigo-600 text-white px-6 py-3 rounded-lg hover:bg-indigo-700 active:bg-indigo-800 transition font-semibold w-full"
          >
            Add User
          </button>
        </form>

        {users.length === 0 ? (
          <p className="text-center text-gray-500 text-xl font-medium">
            No users available yet.
          </p>
        ) : (
          <ul className="space-y-8 max-w-3xl mx-auto">
            {users.map((user) => (
              <li
                key={user.id}
                className="bg-white rounded-2xl shadow-md p-6 hover:shadow-xl transition cursor-pointer"
              >
                <h3 className="text-2xl font-bold text-indigo-800">
                  {user.name}
                </h3>
                <p className="mt-2 text-gray-700 italic">{user.email}</p>
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
