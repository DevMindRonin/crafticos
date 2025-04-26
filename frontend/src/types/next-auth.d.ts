import { Role } from "./user.types";
import "next-auth";

declare module "next-auth" {
  interface User {
    id: string;
    email: string;
    name: string;
    role: Role;
    accessToken: string;
    image?: string | null;
  }

  interface Session {
    user: User;
    accessToken: string;
  }

  interface CredentialsProps {
    email: string;
    setEmail: (emailText: string) => void;
    password: string;
    setPassword: (passwordText: string) => void;
    error: string;
    handleSubmit: (e: React.FormEvent<HTMLFormElement>) => Promise<void>;
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    id: string;
    email: string;
    name: string;
    role: Role;
    accessToken: string;
    picture?: string | null;
  }
}
