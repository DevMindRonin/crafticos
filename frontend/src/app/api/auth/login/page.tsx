"use client";
import { signIn } from "next-auth/react";
import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const result = await signIn("credentials", {
      redirect: false,
      email,
      password,
    });

    if (!result?.error) {
      router.push("/dashboard");
    } else {
      setError("Invalid email or password");
    }
  };

  return (
    <div>
      <h1 className="text-4xl font-bold my-4">Login</h1>

      {/* Google Login */}
      <button
        onClick={() => signIn("google", { callbackUrl: "/dashboard" })}
        className="bg-blue-500 text-white px-4 py-2 rounded w-full"
      >
        Přihlásit se přes Google
      </button>

      <div className="my-4 border-t border-gray-300"></div>

      {/* Formulář pro email + heslo */}
      <form onSubmit={handleSubmit}>
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button type="submit">Login</button>
      </form>

      {error && <p className="text-red-500">{error}</p>}

      {/* Odkaz na registraci */}
      <p className="mt-4">
        Nemáš účet?{" "}
        <Link href="/auth/register" className="text-blue-500 underline">
          Zaregistruj se zde
        </Link>
      </p>
    </div>
  );
}
