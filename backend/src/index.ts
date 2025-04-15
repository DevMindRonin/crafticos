import express from "express";
import cors from "cors";
import "dotenv/config";

import { ApolloServer } from "@apollo/server";
import { serverConfig } from "./config";
import { expressMiddleware } from "@apollo/server/express4";

import { typeDefs } from "./graphql/typedefs";
import { resolvers } from "./graphql/resolvers";

import db from "./db";

import { User } from "./types";
import { getUserFromToken } from "./utils/token";
import { Context, Role } from "@/types";
const app = express();

app.use(cors({ origin: "http://localhost:3000", credentials: true }));
app.use(express.json());

const server = new ApolloServer<Context>({
  typeDefs,
  resolvers,
});

const startServer = async () => {
  try {
    await server.start();

    app.use(
      serverConfig.graphqlPath,
      expressMiddleware(server, {
        context: async ({ req }): Promise<Context> => {
          const token = req.headers.authorization?.split(" ")[1];
          console.log("Authorization header:", req.headers.authorization);

          //
          // 1) Přihlašování s autorizací
          //const user = token ? getUserFromToken(token) : null;

          // 2) Přihlašování bez autorizace
          const user: User = {
            id: "6f143491-1efc-4a6d-aa50-3ad1415f506f",
            email: "aa@aa.aa",
            name: "aa",
            role: Role.ADMIN,
          };
          //

          console.log("Login backend response:", { token, user });
          return { db, user: user as User | null };
        },
      })
    );
    app.listen(serverConfig.port, () => {
      console.log(`Server running on http://localhost:${serverConfig.port}`);
      console.log(
        `GraphQL endpoint: http://localhost:${serverConfig.port}${serverConfig.graphqlPath}`
      );
    });
  } catch (error) {}
};

startServer();
