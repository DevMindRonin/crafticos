import React from "react";
import Link from "next/link";

export const NewRegistration = () => {
  return (
    <div>
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
