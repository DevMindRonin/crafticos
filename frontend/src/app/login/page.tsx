"use client";
import { signIn } from "next-auth/react";
import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    // Přihlášení přes Credentials
    const result = await signIn("credentials", {
      redirect: false, // použijeme vlastní přesměrování
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
    <div className="flex flex-col items-center justify-center min-h-screen p-4">
      <h1 className="text-4xl font-bold my-4">Login</h1>

      {/* Tlačítko pro přihlášení přes Google */}
      <button
        onClick={() => signIn("google", { callbackUrl: "/dashboard" })}
        className="bg-blue-500 text-white px-4 py-2 rounded w-full max-w-md mb-4"
      >
        Přihlásit se přes Google
      </button>

      <div className="w-full max-w-md">
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
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

      {/* Odkaz na registraci */}
      <p className="mt-4">
        Nemáš účet?{" "}
        <Link href="/register" className="text-blue-500 underline">
          Zaregistruj se zde
        </Link>
      </p>
    </div>
  );
};
export default LoginPage;
