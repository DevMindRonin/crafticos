import NextAuth, {
  type NextAuthOptions,
  type User,
  type Account,
  type Session,
} from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import CredentialsProvider from "next-auth/providers/credentials";
import type { JWT } from "next-auth/jwt";
import jwt from "jsonwebtoken";
import { client } from "@/lib/apollo"; // Připojení k GraphQL
import { LOGIN_MUTATION } from "@/graphql/mutations/auth"; // GraphQL mutace
import { Role } from "@/types/types";

export const authOptions: NextAuthOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    }),
    CredentialsProvider({
      name: "Email and Password",
      credentials: {
        email: { label: "Email", type: "email" },
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
          throw new Error(`Invalid email or password ${error}`);
        }
      },
    }),
  ],
  pages: {
    signIn: "/login", // Přesměrování na vlastní login stránku
  },
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
        token.role = user.role || "Unknown user role";
        token.created_at = user.created_at;
        if (account.provider === "google") {
          // Google => vygenerujeme vlastní JWT podepsané stejným SECRET,
          // který ověřuje backend v getUserFromToken
          token.accessToken = jwt.sign(
            { userId: user.id },
            process.env.JWT_SECRET!,
            { expiresIn: "1h" }
          );
        } else {
          // Credentials => token z GraphQL
          token.accessToken = (user as User).accessToken;
        }
      }
      return token;
    },
    async session({ session, token }: { session: Session; token: JWT }) {
      if (token) {
        session.user = {
          id: token.id as string,
          email: token.email as string,
          role: token.role as Role,
          name: token.name,
          created_at: token.created_at as string,
        };
        session.accessToken = token.accessToken as string;
      }
      return session;
    },
    async redirect({ baseUrl }) {
      return `${baseUrl}/dashboard`; // Přesměrování na Dashboard
    },
  },
  secret: process.env.NEXTAUTH_SECRET,
};

const handler = NextAuth(authOptions);
export { handler as POST, handler as GET };
