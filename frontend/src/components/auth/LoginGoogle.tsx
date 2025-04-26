import { signIn } from "next-auth/react";

export const LoginGoogle = () => {
  return (
    <div>
      <button
        onClick={() => signIn("google", { callbackUrl: "/" })}
        className="bg-blue-500 text-white px-4 py-2 rounded w-full max-w-md mb-4"
      >
        Přihlásit se přes Google
      </button>
    </div>
  );
};
