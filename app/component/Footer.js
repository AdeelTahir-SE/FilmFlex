"use client";

import React, { useState } from "react";

export default function Footer() {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [loader, setLoader] = useState(false);

  const handleSubscription = async (event) => {
    event.preventDefault(); // Prevent form from reloading the page
    setLoader(true);
    try {
      const response = await fetch("/api/subscribe", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email }),
      });

      const data = await response.json();

      if (response.ok) {
        setLoader(false);
        setMessage("You have successfully subscribed!");
      } else {
        setMessage(data.error || "Failed to subscribe.");
      }
    } catch (error) {
      setMessage("An unexpected error occurred.");
    }
  };

  return (
    <footer className="bg-gray-950 p-6 text-white pt-3">
      <div className="container mx-auto grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Company Info */}
        <div>
          <h2 className="text-xl font-bold mb-4 text-red-700">Film Flex</h2>
          <p className="text-gray-400 mb-4">
            Your go-to platform for booking movie tickets online. Enjoy the
            latest movies with ease and convenience.
          </p>
          <div className="text-sm">
            &copy; {new Date().getFullYear()} Film Flex. All rights reserved.
          </div>
        </div>

        {/* Quick Links */}
        <div>
          <h2 className="text-xl font-bold mb-4 text-red-700">Quick Links</h2>
          <ul className="space-y-2">
            <li>
              <a href="/faq&support" className="text-gray-400 hover:text-white">
                Contact Us
              </a>
            </li>
            <li>
              <a href="/faq&support" className="text-gray-400 hover:text-white">
                FAQ
              </a>
            </li>
            <li>
              <a href="/faq&support" className="text-gray-400 hover:text-white">
                Support
              </a>
            </li>
          </ul>
        </div>

        {/* Newsletter Subscription */}
        <div>
          <h2 className="text-xl font-bold mb-4 text-red-700">Stay Updated</h2>
          <p className="text-gray-400 mb-4">
            Subscribe to our newsletter to get the latest updates on new movies
            and special offers.
          </p>
          <form
            className="flex flex-col space-y-2"
            onSubmit={handleSubscription}
          >
            <input
              type="email"
              placeholder="Enter your email"
              id="email"
              className="p-2 rounded bg-gray-700 text-white"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
            <button
              type="submit"
              className="p-2 bg-red-600 rounded text-white font-bold hover:bg-red-700"
            >
              Subscribe
            </button>
            <div className="flex justify-center">
              {loader && (
                <div class="flex flex-row gap-2">
                  <div class="w-4 h-4 rounded-full bg-red-500 animate-bounce"></div>
                  <div class="w-4 h-4 rounded-full bg-red-500 animate-bounce [animation-delay:-.3s]"></div>
                  <div class="w-4 h-4 rounded-full bg-red-500 animate-bounce [animation-delay:-.5s]"></div>
                </div>
              )}
            </div>
          </form>
          {message && !loader&& <p className="mt-2 text-sm text-gray-400">{message}</p>}
        </div>
      </div>
    </footer>
  );
}
