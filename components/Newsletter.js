"use client";
import { useState } from "react";

const Newsletter = () => {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");

  const handleSubscribe = async () => {
    if (!email.includes("@")) {
      setMessage("❌ Please enter a valid email address.");
      return;
    }

    try {
      const response = await fetch("http://localhost:5000/subscribe", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });

      const data = await response.json();
      setMessage(data.message);
      if (response.ok) setEmail(""); // Clear input after success
    } catch (error) {
      setMessage("❌ Subscription failed. Try again later.");
    }
  };

  return (
    <section className="py-16 bg-blue-500 text-white text-center">
      <h2 className="text-3xl font-bold mb-4">Stay Updated!</h2>
      <p className="mb-6 text-lg">Sign up for our newsletter to get the latest travel deals.</p>
      <div className="max-w-md mx-auto flex space-x-2">
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Enter your email"
          className="p-3 flex-1 rounded-md text-gray-800"
        />
        <button onClick={handleSubscribe} className="bg-black hover:bg-gray-800 px-6 py-3 rounded-md">
          Subscribe
        </button>
      </div>
      {message && <p className="mt-4 text-lg">{message}</p>}
    </section>
  );
};

export default Newsletter;
