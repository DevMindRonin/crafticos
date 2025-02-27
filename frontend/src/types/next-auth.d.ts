import "next-auth";

declare module "next-auth" {
  interface Session {
    user: {
      id: string;
      email: string;
      role: string;
      name?: string | null;
      image?: string | null;
    };
    accessToken: string;
  }

  interface JWT {
    id: string;
    email: string;
    role: string;
    accessToken: string;
  }
}
