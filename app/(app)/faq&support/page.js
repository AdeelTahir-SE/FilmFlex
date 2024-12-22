"use client";
import React, { useState } from "react";
import Image from "next/image";
export default function Page() {
  const [formData, setFormData] = useState({
    subject: "",
    email: "",
    question: "",
    password:"",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) =>{
    e.preventDefault();
    await fetch("/api/faqandsupport", {
      method: "POST",
      body: JSON.stringify(formData),
      headers: {
        "Content-Type": "application/json",
      },
    });
    console.log("Form submitted:", formData);
  };

  return (
    <div className="w-full min-h-screen p-6 flex flex-col bg-black  text-white">
      <h1 className="text-4xl font-bold mb-6 text-red-600 text-center">
        Information
      </h1>
      <p className="font-bold text-xl mb-2 text-center">
        Below are some commonly asked questions and their corresponding answers
        to help you gain a deeper understanding of our{" "}
        <span className="text-red-500">services</span>. We encourage you to
        review this information, as it addresses key aspects of our
        <span className="text-red-500"> offerings</span> and may assist you in
        making informed decisions. Should you have any further inquiries, please
        do not hesitate to reach out for additional{" "}
        <span className="text-red-500">assistance</span>.
      </p>
      <div className="mb-12 flex flex-col items-center border-b-2 pb-20 border-gray-600">
        <div className="flex flex-row justify-around items-center">
          <h2 className="text-3xl font-bold mb-4 text-red-500 text-center">
            Frequently Asked Questions
          </h2>
          <Image src="/confusion.png" width={120} height={120} />
        </div>
        <div className="space-y-6">
          <div className="mb-4">
            <h3 className="text-2xl font-semibold">How do I book a ticket?</h3>
            <p className="text-gray-300">
              You can book a ticket by selecting your desired movie, showtime,
              and seats on our website. Once selected, proceed to the payment
              page to complete your booking.
            </p>
          </div>

          <div className="mb-4">
            <h3 className="text-2xl font-semibold">Can I cancel my booking?</h3>
            <p className="text-gray-300">
              Yes, you can cancel your booking up to 24 hours before the
              showtime. Please visit the 'My Bookings' section to cancel your
              reservation.
            </p>
          </div>
          <div className="mb-4">
            <h3 className="text-2xl font-semibold">
              What payment methods are accepted?
            </h3>
            <p className="text-gray-300">
              We accept all major credit and debit cards, as well as PayPal.
            </p>
          </div>
          <div className="mb-4">
            <h3 className="text-2xl font-semibold">
              Is there a mobile app available?
            </h3>
            <p className="text-gray-300">
              Yes, our mobile app is available for both iOS and Android. You can
              download it from the App Store or Google Play.
            </p>
          </div>
        </div>
      </div>
      <div className="mb-12 items-center flex flex-col border-b-2 pb-20 border-gray-600">
        <h2 className="text-3xl font-bold mb-4 text-red-500 text-center">
          Support
        </h2>
        <div className="space-y-6">
          <div className="mb-4">
            <h3 className="text-2xl font-semibold">Contact Us</h3>
            <p className="text-gray-300">
              If you have any questions or need assistance, please contact our
              support team:
            </p>
            <ul className="list-disc list-inside text-gray-300">
              <li>Email: adeeltahir6a@gmail.com</li>
              <li>Phone: +92 3334062285</li>
            </ul>
          </div>
          <div className="mb-4">
            <h3 className="text-2xl font-semibold">Live Chat</h3>
            <p className="text-gray-300">
              You can also chat with our support team live by clicking the chat
              icon at the bottom right corner of the screen.
            </p>
          </div>
          <div className="mb-4">
            <h3 className="text-2xl font-semibold">Help Center</h3>
            <p className="text-gray-300">
              Visit our{" "}
              <a href="/help-center" className="text-red-500">
                Help Center
              </a>{" "}
              for more information and FAQs.
            </p>
          </div>
        </div>
      </div>
      {/* Question Form */}
      <div className="mb-12">
        <h2 className="text-3xl font-bold mb-4 text-red-500 text-center">
          Ask a Question
        </h2>
        <form
          onSubmit={handleSubmit}
          className="bg-gray-800 p-4 rounded-lg space-y-4 w-full max-w-2xl mx-auto"
        >
          <div className="mb-4">
            <label className="block text-gray-300 mb-2" htmlFor="email">
              Email
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className="w-full p-2 rounded bg-gray-700 text-white"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-300 mb-2" htmlFor="password">
              Password
            </label>
            <input
              type="password"
              id="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              className="w-full p-2 rounded bg-gray-700 text-white"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-300 mb-2" htmlFor="subject">
              Subject
            </label>
            <input
              type="text"
              id="subject"
              name="subject"
              value={formData.subject}
              onChange={handleChange}
              className="w-full p-2 rounded bg-gray-700 text-white"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-300 mb-2" htmlFor="question">
              Question
            </label>
            <textarea
              id="question"
              name="question"
              value={formData.question}
              onChange={handleChange}
              className="w-full p-2 rounded bg-gray-700 text-white"
              rows="4"
              required
            ></textarea>
          </div>
          <button
            type="submit"
            className="w-full p-2 bg-red-600 rounded text-white font-bold hover:bg-red-700"
          >
            Submit
          </button>
        </form>
      </div>
    </div>
  );
}
