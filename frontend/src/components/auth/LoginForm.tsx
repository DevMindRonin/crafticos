"use client";
import { useState } from "react";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";

export default function LoginForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const router = useRouter();

  const handleSubmitCredentials = async (e: React.FormEvent) => {
    e.preventDefault();
    const result = await signIn("credentials", {
      redirect: false,
      email,
      password,
    });
    if (!result?.error) {
      router.refresh();
    } else {
      setError("Invalid email or password");
    }
  };

  return (
    <>
      {/* Google Login */}
      <button
        onClick={() => signIn("google", { callbackUrl: "/" })}
        className="bg-blue-500 text-white px-4 py-2 rounded w-full max-w-md mb-4"
      >
        Přihlásit se přes Google
      </button>

      {/* Credentials Login */}
      <div className="w-full max-w-md">
        <form
          onSubmit={handleSubmitCredentials}
          className="flex flex-col gap-4"
        >
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="border p-2 rounded"
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="border p-2 rounded"
          />
          <button
            type="submit"
            className="bg-green-500 text-white px-4 py-2 rounded"
          >
            Login
          </button>
        </form>
        {error && <p className="text-red-500 mt-2">{error}</p>}
      </div>
    </>
  );
}
