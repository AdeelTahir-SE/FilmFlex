"use client";
import { useState } from "react";
import { Vortex } from "../../component/ui/vortex";
import { useRouter } from "next/navigation"; // Next.js router to handle redirection
import { FaGoogle,FaGithub } from "react-icons/fa";
export default function Signin() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const router = useRouter(); // Hook to redirect after successful login

  const handleSubmit = async (event) => {
    event.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const response = await fetch("/api/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });

      if (response.ok) {
        // On success, redirect to home page or dashboard
        router.push("/"); // or replace with the appropriate page like '/dashboard'
      } else if(response.status === 500) {
        const errorData = await response.json();
        setError(errorData.message || "Invalid email or password");
      }
      else if(response.status===401){
        setError("Invalid email or password");
      }
      else {
        setError("An error occurred during login.");
      }
    } catch (error) {
      setError("An error occurred during login.");
    } finally {
      setLoading(false);
    }
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
          <h2 className="text-3xl font-bold text-red-500 mb-6 text-center">Sign In</h2>
          <form className="space-y-6" onSubmit={handleSubmit}>
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
              {loading ? "Signing In..." : "Sign In"}
            </button>
          </form>
          <div className="mt-6 text-center">
            <p className="text-gray-300">Or Sign in using:</p>
            <div className="flex justify-center mt-4 space-x-4">
              <button
                onClick={() => handleOAuth("google")}
                className="flex items-center justify-center px-4 py-2 bg-red-600 text-white rounded-md shadow-md hover:bg-red-700"
              >
                Sign in with Google <FaGoogle/>
              </button>
              
              <button
                onClick={() => handleOAuth("github")}
                className="flex items-center justify-center px-4 py-2 bg-gray-800 text-white rounded-md shadow-md hover:bg-gray-900"
              >
                Sign in with GitHub <FaGithub/>
              </button>
            </div>
          </div>
          <div className="mt-6 text-center">
            <p className="text-gray-300">
              Don't have an account?
              <a href="/register" className="font-medium text-red-500 hover:text-red-400">
                Register now
              </a>
            </p>
          </div>
        </div>
      </Vortex>
    </div>
  );
}
