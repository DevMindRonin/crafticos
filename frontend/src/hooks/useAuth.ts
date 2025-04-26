"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { signIn } from "next-auth/react";

export const useAuth = () => {
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

  return {
    handleSubmitCredentials,
    email,
    setEmail,
    password,
    setPassword,
    error,
  };
};
