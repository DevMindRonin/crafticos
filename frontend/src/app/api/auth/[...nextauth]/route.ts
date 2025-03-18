import NextAuth, {
  type NextAuthOptions,
  type Account,
  type User,
  type Session,
} from "next-auth";
import { Role } from "@/types/types";

import { client } from "@/lib/apollo"; // Připojení k GraphQL
import GoogleProvider from "next-auth/providers/google";
import CredentialsProvider from "next-auth/providers/credentials";
import type { JWT } from "next-auth/jwt";
import {
  LOGIN_MUTATION,
  REGISTER_MUTATION,
  GET_USER_QUERY,
} from "@/graphql/mutations/auth";

export const authOptions: NextAuthOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
      // Callback vracející objekt pro auto-registraci / nalezení Google uživatele
      async profile(profile) {
        try {
          // 1) Zkus získat uživatele z DB podle emailu
          const res = await client.query({
            query: GET_USER_QUERY,
            variables: { email: profile.email },
            fetchPolicy: "network-only",
          });

          if (res.data && res.data.user) {
            const { data: loginData } = await client.mutate({
              mutation: LOGIN_MUTATION,
              variables: {
                email: profile.email,
                password: "", // prázdný řetězec (musí to projít na backendu)
                isGoogleFlow: true,
              },
            });

            // Vrátíme user + token
            return {
              ...loginData.login.user,
              accessToken: loginData.login.token,
            };
          }

          // 2) Pokud uživatel neexistuje, zaregistrujeme ho:
          const { data } = await client.mutate({
            mutation: REGISTER_MUTATION,
            variables: {
              email: profile.email,
              password: "", // Pro Google nepotřebujete reálné heslo: password: "",
              name: profile.name,
              role: Role.USER,
            },
          });

          // 3) Vraťte user + token, aby NextAuth mohl uložit 'accessToken' do session
          return {
            ...data.register.user,
            accessToken: data.register.token, // Tohle je klíčová změna
          };
        } catch (error) {
          console.error("Google auto-registration error:", error);
          // Dříve tady byl fallback, ale teď chceme vidět, co se *opravdu* rozbilo.
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
        try {
          const { data } = await client.mutate({
            mutation: LOGIN_MUTATION,
            variables: {
              email: credentials?.email,
              password: credentials?.password,
              isGoogleFlow: false,
            },
          });
          const { token, user } = data.login;
          if (!user) throw new Error("Invalid login credentials");
          return { ...user, accessToken: token };
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
      user?: User; // user je rozšířený module augmentation
    }) {
      if (account && user) {
        token.id = user.id;
        token.email = user.email;
        token.role = user.role || Role.USER;

        token.accessToken = (user as User).accessToken;
      }
      return token;
    },
    async session({ session, token }: { session: Session; token: JWT }) {
      if (token) {
        session.user = {
          id: token.id as string,
          email: token.email,
          role: token.role as Role,
          name: token.name,

          image: session.user.image, // zachová se původní hodnota, pokud existuje
        };
        session.accessToken = token.accessToken as string;
      }
      return session;
    },
    async redirect({ baseUrl }) {
      return `${baseUrl}/dashboard`;
    },
  },
  secret: process.env.JWT_SECRET,
  debug: true,
};
console.log(`JWT_SECRET je: ${process.env.JWT_SECRET}`);
const handler = NextAuth(authOptions);
export { handler as POST, handler as GET };
