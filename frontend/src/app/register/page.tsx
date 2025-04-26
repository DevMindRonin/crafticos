"use client";
import { useMutation } from "@apollo/client";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { REGISTER_MUTATION } from "@/graphql/auth";
import { Role } from "@/types/user.types";
import { signIn } from "next-auth/react";

export default function RegisterPage() {
  const [register] = useMutation(REGISTER_MUTATION);
  const router = useRouter();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    name: "",
    role: Role.USER,
  });
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const { data } = await register({ variables: formData });

      if (!data) {
        throw new Error("Registration failed");
      }
      const result = await signIn("credentials", {
        redirect: false, // pokud chcete nejdřív ošetřit výsledek
        email: formData.email,
        password: formData.password,
      });

      if (!result || !result.ok) {
        throw new Error("Auto-login failed. Please log in manually.");
      }

      router.push("/");
    } catch (err) {
      setError(
        `Registration failed: ${err instanceof Error ? err.message : err}`
      );
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-4">
      <h1 className="text-4xl font-bold my-4">Register</h1>
      <form
        onSubmit={handleSubmit}
        className="flex flex-col gap-4 w-full max-w-md"
      >
        <input
          type="text"
          placeholder="Name"
          value={formData.name}
          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
          className="border p-2 rounded"
        />
        <input
          type="email"
          placeholder="Email"
          value={formData.email}
          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
          className="border p-2 rounded"
        />
        <input
          type="password"
          placeholder="Password"
          value={formData.password}
          onChange={(e) =>
            setFormData({ ...formData, password: e.target.value })
          }
          className="border p-2 rounded"
        />
        <button
          type="submit"
          className="bg-green-500 text-white px-4 py-2 rounded"
        >
          Register
        </button>
      </form>
      {error && <p className="text-red-500 mt-2">{error}</p>}
    </div>
  );
}
