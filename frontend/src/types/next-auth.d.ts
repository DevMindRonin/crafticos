import "next-auth";
import { Role } from "@/types/types";
declare module "next-auth" {
  interface User extends NextAuthUser {
    name?: string | null;
    role?: Role;
    accessToken?: string;
    image?: string | null;
    created_at: string;
  }

  interface Session {
    user: User;
    accessToken: string;
  }

  interface JWT {
    id: string;
    email: string;
    name?: string;
    role: Role;
    accessToken: string;
    created_at: string;
  }
}
