"use client";

import { LOGIN_USER, REGISTER_USER } from "@/app/api/api_constants";
import { setAccessToken, setRefreshToken } from "@/app/utils/tokens";
import { useQueryClient } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { useState } from "react";
import toast from "react-hot-toast";

export default function LoginRegister() {
  const router = useRouter();
  const queryClient = useQueryClient();
  const [activeTab, setActiveTab] = useState<"login" | "register">("login");
  const [form, setForm] = useState({ email: "", password: "" });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const endpoint = activeTab === "login" ? LOGIN_USER : REGISTER_USER;

    const res = await fetch(endpoint, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form),
    });

    const data = await res.json();

    if (!res.ok) {
      if (
        res.status === 401 &&
        data.error === "Incorrect password. Please try again."
      ) {
        toast.error("Incorrect password. Please try again.");
        setForm((prev) => ({ ...prev, password: "" })); // Reset password field
      } else {
        toast.error(data.message || "Something went wrong");
      }
      return;
    }

    queryClient.invalidateQueries({ queryKey: ["profile"] });
    setAccessToken(data.accessToken);
    setRefreshToken(data.refreshToken);

    if (activeTab === "login") {
      toast.success("Logged in successfully");
      router.push("/dashboard");
    } else {
      toast.success("Registered successfully");
      setActiveTab("login");
      setForm({ email: "", password: "" });
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-100 to-gray-200 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8 bg-white p-8 rounded-xl shadow-2xl transform transition-all duration-300">
        <div className="text-center">
          <h2 className="text-3xl font-extrabold text-gray-900 tracking-tight">
            {activeTab === "login"
              ? "Login to access your saved world! 🔑"
              : "Join us today - Never lose a thought again 💭"}
          </h2>
          <p className="mt-2 text-sm text-gray-600">
            {activeTab === "login"
              ? "Ready to explore what you saved 😄 ?"
              : "Quickly save links, notes and ideas - all in one place 🧠"}
          </p>
        </div>

        <div className="flex justify-center space-x-4 border-b-2 border-gray-200">
          <button
            onClick={() => setActiveTab("login")}
            className={`flex-1 py-3 text-lg font-medium transition-colors duration-200 ${
              activeTab === "login"
                ? "border-b-2 border-indigo-600 text-indigo-600"
                : "text-gray-500 hover:text-gray-700"
            } focus:outline-none`}
            aria-label="Switch to login tab"
          >
            Login
          </button>
          <button
            onClick={() => setActiveTab("register")}
            className={`flex-1 py-3 text-lg font-medium transition-colors duration-200 ${
              activeTab === "register"
                ? "border-b-2 border-indigo-600 text-indigo-600"
                : "text-gray-500 hover:text-gray-700"
            } focus:outline-none`}
            aria-label="Switch to register tab"
          >
            Register
          </button>
        </div>

        <form onSubmit={handleSubmit} className="mt-8 space-y-6">
          <div className="space-y-4">
            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium text-gray-700"
              >
                Email address
              </label>
              <input
                id="email"
                type="email"
                name="email"
                value={form.email}
                onChange={handleChange}
                required
                className="mt-1 block w-full px-4 py-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all duration-200 sm:text-sm"
                placeholder="you@example.com"
                aria-required="true"
              />
            </div>

            <div>
              <label
                htmlFor="password"
                className="block text-sm font-medium text-gray-700"
              >
                Password
              </label>
              <input
                id="password"
                type="password"
                name="password"
                value={form.password}
                onChange={handleChange}
                required
                className="mt-1 block w-full px-4 py-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all duration-200 sm:text-sm"
                placeholder="••••••••"
                aria-required="true"
              />
            </div>
          </div>

          <button
            type="submit"
            className="w-full flex justify-center py-3 px-4 border border-transparent rounded-lg shadow-md text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-all duration-200"
            aria-label={activeTab === "login" ? "Login" : "Register"}
          >
            {activeTab === "login" ? "Sign In" : "Create Account"}
          </button>
        </form>

        <div className="text-center">
          <p className="text-sm text-gray-600">
            {activeTab === "login"
              ? "Don't have an account?"
              : "Already have an account?"}
            <button
              onClick={() =>
                setActiveTab(activeTab === "login" ? "register" : "login")
              }
              className="ml-1 font-medium text-indigo-600 hover:text-indigo-500 transition-colors duration-200"
              aria-label={`Switch to ${
                activeTab === "login" ? "register" : "login"
              }`}
            >
              {activeTab === "login" ? "Sign up" : "Sign in"}
            </button>
          </p>
        </div>
      </div>
    </div>
  );
}
