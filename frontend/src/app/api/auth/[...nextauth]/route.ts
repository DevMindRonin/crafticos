import NextAuth, {
  type NextAuthOptions,
  type Account,
  type User,
  type Session,
} from "next-auth";
import { Role } from "@/types/user.types";
import type { JWT } from "next-auth/jwt";
import { client } from "@/lib/apollo"; // Připojení k GraphQL
import GoogleProvider from "next-auth/providers/google";
import CredentialsProvider from "next-auth/providers/credentials";

import {
  LOGIN_MUTATION,
  REGISTER_MUTATION,
  GET_USER_QUERY,
} from "@/graphql/auth";

export const authOptions: NextAuthOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,

      async profile(profile) {
        try {
          console.log("Google profile:", profile);

          const res = await client.query({
            query: GET_USER_QUERY,
            variables: { email: profile.email },
            fetchPolicy: "network-only",
          });

          console.log("GetUserByEmail response:", res.data);

          if (res.data && res.data.getUserByEmail) {
            console.log("User exists, attempting login");
            const { data: loginData } = await client.mutate({
              mutation: LOGIN_MUTATION,
              variables: {
                email: profile.email,
                password: "",
                isGoogleFlow: true,
              },
            });

            console.log("Login frontend response:", loginData);

            return {
              ...loginData.login.user,
              accessToken: loginData.login.token,
            };
          }

          console.log("User doesn't exist, attempting registration");

          const { data } = await client.mutate({
            mutation: REGISTER_MUTATION,
            variables: {
              email: profile.email,
              password: "",
              name: profile.name,
              role: Role.USER,
            },
          });

          console.log("Registration response:", data);

          return {
            ...data.register.user,
            accessToken: data.register.token,
          };
        } catch (error) {
          console.error("Google auth error:", error);
          throw error;
        }
      },
    }),
    CredentialsProvider({
      name: "Email and Password",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        console.log("Received frontend credentials:", credentials);
        try {
          if (!credentials?.email || !credentials?.password) {
            throw new Error("Email and password are required");
          }

          const { data } = await client.mutate({
            mutation: LOGIN_MUTATION,
            variables: {
              email: credentials?.email,
              password: credentials?.password,
              isGoogleFlow: false,
            },
          });
          console.log("Login mutation response:", data);
          const { token, user } = data.login;
          if (!user || !token) {
            throw new Error("Invalid login credentials");
          }

          console.log("Returning user data:", {
            id: user.id,
            email: user.email,
            name: user.name,
            role: user.role,
            hasToken: !!token,
          });

          return {
            id: user.id,
            email: user.email,
            name: user.name,
            role: user.role,
            accessToken: token,
          };
        } catch (error) {
          console.error("Login error:", error);
          throw new Error("Invalid email or password");
        }
      },
    }),
  ],
  pages: {
    signIn: "/login",
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
      console.log("JWT callback - token:", token);
      console.log("JWT callback - account:", account);
      console.log("JWT callback - user:", user);

      if (account && user) {
        token.id = user.id;
        token.email = user.email;
        token.role = user.role || Role.USER;
        token.accessToken = (user as User).accessToken;
      }
      return token;
    },
    async session({ session, token }: { session: Session; token: JWT }) {
      console.log("Session callback - session:", session);
      console.log("Session callback - token:", token);

      if (token) {
        session.user = {
          id: token.id as string,
          email: token.email,
          role: token.role as Role,
          name: token.name,
          accessToken: token.accessToken,
        };
        session.accessToken = token.accessToken as string;
      }
      return session;
    },
    async redirect({ url, baseUrl }) {
      console.log("Redirect callback - url:", url);
      console.log("Redirect callback - baseUrl:", baseUrl);
      return `${baseUrl}/`;
    },
  },
  secret: process.env.JWT_SECRET,
  debug: true,
};

const handler = NextAuth(authOptions);
export { handler as POST, handler as GET };
