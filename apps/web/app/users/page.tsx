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
    <div className="min-h-screen bg-gray-100 p-6">
      <div className="max-w-2xl mx-auto">
        <h1 className="text-4xl font-bold text-center text-blue-700 mb-6">Users Page</h1>

        {message && (
          <div className="bg-green-100 text-green-800 px-4 py-2 rounded mb-4 shadow">
            {message}
          </div>
        )}

        <form onSubmit={handleSubmit} className="bg-white rounded shadow p-6 mb-8 space-y-4">
          <h2 className="text-2xl font-semibold text-gray-800">Add New User</h2>
          <div>
            <input
              type="text"
              placeholder="Name"
              className="border rounded px-3 py-2 w-full focus:outline-none focus:ring-2 focus:ring-blue-400"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </div>
          <div>
            <input
              type="email"
              placeholder="Email"
              className="border rounded px-3 py-2 w-full focus:outline-none focus:ring-2 focus:ring-blue-400"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <button
            type="submit"
            className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition"
          >
            Add User
          </button>
        </form>

        {users.length === 0 ? (
          <p className="text-center text-gray-600">No users available yet.</p>
        ) : (
          <ul className="space-y-4">
            {users.map((user) => (
              <li
                key={user.id}
                className="bg-white p-4 rounded shadow hover:shadow-md transition"
              >
                <span className="text-lg font-bold text-gray-800">{user.name}</span>
                <span className="text-gray-600">{user.email}</span>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}
