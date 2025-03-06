import NextAuth, {
  type NextAuthOptions,
  type User as NextAuthUser,
  type Account,
  type Session,
} from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import CredentialsProvider from "next-auth/providers/credentials";
import jwt from "jsonwebtoken";
import type { JWT } from "next-auth/jwt";
import { client } from "../../../../lib/apollo"; // Připojení k GraphQL
import { LOGIN_MUTATION } from "@/graphql/mutations/auth"; // GraphQL mutace

interface User extends NextAuthUser {
  accessToken?: string;
}

export const authOptions: NextAuthOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    }),
    CredentialsProvider({
      name: "Email and Password",
      credentials: {
        email: {
          label: "Email",
          type: "email",
          placeholder: "example@example.com",
        },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        try {
          const { data } = await client.mutate({
            mutation: LOGIN_MUTATION,
            variables: {
              email: credentials?.email,
              password: credentials?.password,
            },
          });

          const { token, user } = data.login;
          if (!user) throw new Error("Invalid login credentials");

          return { ...user, accessToken: token } as User;
        } catch (error) {
          throw new Error(`Invalid email or password: ${error}`);
        }
      },
    }),
  ],
  callbacks: {
    async jwt({
      token,
      account,
      user,
    }: {
      token: JWT;
      account?: Account | null;
      user?: User;
    }) {
      if (account && user) {
        token.id = user.id;
        token.email = user.email;
        token.role = "user";
        // Použijeme accessToken, pokud existuje, jinak vygenerujeme nový
        token.accessToken =
          (user as User).accessToken ||
          jwt.sign({ userId: user.id }, process.env.JWT_SECRET!, {
            expiresIn: "15m",
          });
      }
      return token;
    },
    async session({ session, token }: { session: Session; token: JWT }) {
      if (token) {
        session.user = {
          id: token.id as string,
          email: token.email as string,
          role: token.role as string,
        };
        session.accessToken = token.accessToken as string;
      }
      return session;
    },
  },
  secret: process.env.NEXTAUTH_SECRET,
};

const handler = NextAuth(authOptions);
export { handler as POST, handler as GET };
