"use client";
import { useState } from "react";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";

export default function LoginForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const result = await signIn("credentials", { redirect: false, email, password });

    if (!result.error) {
      router.push("/dashboard"); // Redirect to dashboard after login
    } else {
      setMessage(`❌ ${result.error}`);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="p-4 border">
      <input
        type="email"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        className="border p-2 m-2"
        required
      />
      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        className="border p-2 m-2"
        required
      />
      <button type="submit" className="px-4 py-2 bg-blue-500 text-white rounded">
        Login
      </button>
      {message && <p className="mt-2">{message}</p>}
    </form>
  );
}
