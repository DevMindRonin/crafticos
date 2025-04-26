"use client";
import { NewRegistration } from "@/components/auth/NewRegistration";
import { LoginGoogle } from "@/components/auth/LoginGoogle";
import { LoginCredentials } from "@/components/auth/LoginCredentials";
import { useAuth } from "@/hooks/useAuth";

const LoginPage = () => {
  const {
    handleSubmitCredentials,
    email,
    setEmail,
    password,
    setPassword,
    error,
  } = useAuth();

  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-4">
      <h1 className="text-4xl font-bold my-4">Login</h1>
      <LoginGoogle />
      <LoginCredentials
        email={email}
        setEmail={setEmail}
        password={password}
        setPassword={setPassword}
        error={error}
        handleSubmit={handleSubmitCredentials}
      />
      <NewRegistration />
    </div>
  );
};
export default LoginPage;
