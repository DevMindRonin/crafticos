import React from "react";

export const MakeRegistration = () => {
  return (
    <div>
      <p className="mt-4">
        Nemáš účet?{" "}
        <a href="/register" className="text-blue-500 underline">
          Zaregistruj se zde
        </a>
      </p>
    </div>
  );
};
