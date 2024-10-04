import React from "react";
import Link from "next/link";
import handleSubscription from "../actions/handlesubscription";


export default function Footer() {
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
          
            <li>
              {" "}
              {/* Social Media Links */}
              <div className="container mx-auto mt-6 flex justify-center space-x-4">
              
             
                
                <Link
                  href="https://www.linkedin.com/in/adeel-tahir-fullstackdeveoper/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-400 hover:text-white"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                    className="w-6 h-6"
                  >
                    <path d="M22.23 0H1.77C.79 0 0 .77 0 1.72v20.56C0 23.23.79 24 1.77 24h20.46c.98 0 1.77-.77 1.77-1.72V1.72C24 .77 23.21 0 22.23 0zM7.12 20.45H3.56V9h3.56v11.45zM5.34 7.58c-1.14 0-2.06-.92-2.06-2.06s.92-2.06 2.06-2.06 2.06.92 2.06 2.06-.92 2.06-2.06 2.06zm15.11 12.87h-3.56v-5.59c0-1.33-.03-3.04-1.85-3.04-1.85 0-2.13 1.45-2.13 2.95v5.68H9.35V9h3.42v1.56h.05c.48-.91 1.65-1.85 3.4-1.85 3.63 0 4.3 2.39 4.3 5.49v6.25z" />
                  </svg>
                </Link>
                <Link
                  href="https://github.com/AdeelTahir-SE"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-400 hover:text-white"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                    className="w-6 h-6"
                  >
                    <path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.387.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61-.546-1.387-1.333-1.757-1.333-1.757-1.09-.744.083-.729.083-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.775.418-1.305.76-1.605-2.665-.305-5.466-1.335-5.466-5.93 0-1.31.47-2.38 1.235-3.22-.125-.303-.535-1.523.115-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.655 1.653.245 2.873.12 3.176.77.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.62-5.475 5.92.43.37.81 1.096.81 2.21 0 1.595-.015 2.88-.015 3.27 0 .32.21.694.825.577C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12" />
                  </svg>
                </Link>
               
              </div>
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
          <form className="flex flex-col space-y-2" onSubmit={handleSubscription}>
            <input
              type="email"
              placeholder="Enter your email"
              id="email"
              className="p-2 rounded bg-gray-700 text-white"
              required
            />
            <button
              type="submit"
              className="p-2 bg-red-600 rounded text-white font-bold hover:bg-red-700"
            >
              Subscribe
            </button>
          </form>
        </div>
      </div>
    </footer>
  );
}

