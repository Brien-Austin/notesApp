"use client";

import { LOGIN_USER, REGISTER_USER } from "@/app/api/api_constants";
import { setAccessToken, setRefreshToken } from "@/app/utils/tokens";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function LoginRegister() {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState<"login" | "register">("login");
  const [form, setForm] = useState({ email: "", password: "" });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const endpoint = activeTab === "login" ? LOGIN_USER : REGISTER_USER;

    try {
      const res = await fetch(endpoint, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.message || "Something went wrong");

      setAccessToken(data.accessToken);
      setRefreshToken(data.refreshToken);

      if (activeTab === "login") {
        alert("Logged in successfully");
        router.push("/dashboard");
      } else {
        alert("Registered successfully");
        setActiveTab("login");
        setForm({ email: "", password: "" });
      }
    } catch (err: any) {
      alert(err.message);
    }
  };

  return (
    <div className="max-w-md mx-auto mt-10 p-6 bg-white shadow-md rounded-md">
      <div className="flex border-b mb-6">
        <button
          onClick={() => setActiveTab("login")}
          className={`flex-1 py-2 text-center font-semibold ${
            activeTab === "login"
              ? "border-b-2 border-blue-500 text-blue-600"
              : "text-gray-500"
          }`}
        >
          Login
        </button>
        <button
          onClick={() => setActiveTab("register")}
          className={`flex-1 py-2 text-center font-semibold ${
            activeTab === "register"
              ? "border-b-2 border-blue-500 text-blue-600"
              : "text-gray-500"
          }`}
        >
          Register
        </button>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Email
          </label>
          <input
            type="email"
            name="email"
            value={form.email}
            onChange={handleChange}
            required
            className="mt-1 w-full border px-3 py-2 rounded-md focus:outline-none focus:ring focus:ring-blue-300"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">
            Password
          </label>
          <input
            type="password"
            name="password"
            value={form.password}
            onChange={handleChange}
            required
            className="mt-1 w-full border px-3 py-2 rounded-md focus:outline-none focus:ring focus:ring-blue-300"
          />
        </div>

        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700"
        >
          {activeTab === "login" ? "Login" : "Register"}
        </button>
      </form>
    </div>
  );
}
