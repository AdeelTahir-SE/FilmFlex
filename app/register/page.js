"use client";
import { useState } from "react";
import { Vortex } from "../component/ui/vortex";
import { useRouter } from "next/navigation"; // Next.js router to handle redirection
import { FaGoogle,FaGithub } from "react-icons/fa";
export default function Register() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const router = useRouter(); // Hook to redirect after successful registration

  const handleSubmit = async (event) => {
    event.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const response = await fetch("/api/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ name, email, password }),
      });

      if (response.ok) {
        // On success, redirect to home page
        router.push("/");
      } else {
        const errorData = await response.json();
        setError(errorData.message || "Something went wrong");
      }
    } catch (error) {
      setError("An error occurred while creating the user.");
    } finally {
      setLoading(false);
    }
  };

  const handleOAuth = (provider) => {
    // Redirect to OAuth authentication route
    router.push(`/api/auth/${provider}`);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-black via-gray-900 to-red-900 overflow-hidden">
      <Vortex
        backgroundColor="black"
        rangeY={800}
        particleCount={500}
        baseHue={120}
        className="flex items-center flex-col justify-center w-full h-full"
      >
        <div className="bg-black p-8 rounded-lg shadow-lg max-w-md w-full opacity-80">
          <h2 className="text-3xl font-bold text-red-500 mb-6 text-center">
            Register
          </h2>
          <form className="space-y-6" onSubmit={handleSubmit}>
            <div>
              <label htmlFor="name" className="block text-sm font-medium text-gray-300">
                Name
              </label>
              <input
                type="text"
                id="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="mt-1 block w-full px-3 py-2 bg-gray-800 text-gray-300 border border-gray-700 rounded-md shadow-sm focus:outline-none focus:ring-red-500 focus:border-red-500"
                placeholder="Your Name"
              />
            </div>
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-300">
                Email
              </label>
              <input
                type="email"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="mt-1 block w-full px-3 py-2 bg-gray-800 text-gray-300 border border-gray-700 rounded-md shadow-sm focus:outline-none focus:ring-red-500 focus:border-red-500"
                placeholder="you@example.com"
              />
            </div>
            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-300">
                Password
              </label>
              <input
                type="password"
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="mt-1 block w-full px-3 py-2 bg-gray-800 text-gray-300 border border-gray-700 rounded-md shadow-sm focus:outline-none focus:ring-red-500 focus:border-red-500"
                placeholder="••••••••"
              />
            </div>
            {error && <p className="text-red-500 text-sm">{error}</p>}
            <button
              type="submit"
              className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
              disabled={loading}
            >
              {loading ? "Registering..." : "Register"}
            </button>
          </form>
          <div className="mt-6 text-center">
            <p className="text-gray-300">Or register using:</p>
            <div className="flex justify-center mt-4 space-x-4">
              <button
                onClick={() => handleOAuth("google")}
                className="flex items-center justify-center px-4 py-2 bg-red-600 text-white rounded-md shadow-md hover:bg-red-700"
              >
                Register with Google<FaGoogle/>
              </button>
              
              <button
                onClick={() => handleOAuth("github")}
                className="flex items-center justify-center px-4 py-2 bg-gray-800 text-white rounded-md shadow-md hover:bg-gray-900"
              >
                Register with GitHub<FaGithub/>
              </button>
            </div>
          </div>
          <div className="mt-6 text-center">
            <p className="text-gray-300">
              Already have an account?{" "}
              <a href="/Signin" className="font-medium text-red-500 hover:text-red-400">
                Sign In
              </a>
            </p>
          </div>
        </div>
      </Vortex>
    </div>
  );
}
