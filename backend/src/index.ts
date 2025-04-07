import express from "express";
import cors from "cors";
import "dotenv/config";

import { ApolloServer } from "@apollo/server";
import { serverConfig } from "./config";
import { expressMiddleware } from "@apollo/server/express4";

import { typeDefs } from "./graphql/typedefs";
import { resolvers } from "./graphql/resolvers";

import db from "./db";

import { User, Role } from "./types";
import { getUserFromToken } from "./graphql/context";

const app = express();

app.use(cors());
app.use(express.json());

const server = new ApolloServer({
  typeDefs,
  resolvers,
});

async function startServer() {
  try {
    await server.start();

    app.use(
      serverConfig.graphqlPath,
      expressMiddleware(server, {
        context: async ({ req }) => {
          // Authorization: Bearer <token> - teď jsem to vyrušil, abych to nemusel pořád ověřovat token v hlavičce
          // const token = req.headers.authorization?.split(" ")[1];
          // const user = token ? getUserFromToken(token) : null;
          // aby to fungovalo, stanovil jsem prázdného "user"
          const user: User = {
            id: "6f143491-1efc-4a6d-aa50-3ad1415f506f",
            email: "aa@aa.aa",
            name: "aa",
            role: Role.ADMIN,
            password: null,
          };

          console.log("Decoded User:", user); // Ověřte, zda je user správně dekódován
          return { db, user }; // user je zatím null, pak to upravím
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
}

startServer();
