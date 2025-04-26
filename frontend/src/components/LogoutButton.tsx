"use client";
import { signOut } from "next-auth/react";

export default function LogoutButton() {
  return (
    <button
      onClick={() => signOut({ callbackUrl: "/login" })}
      className="bg-danger text-white px-4 py-2 rounded mt-2"
    >
      Logout
    </button>
  );
}
