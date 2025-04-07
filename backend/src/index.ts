import "dotenv/config";
import express from "express";
import cors from "cors";
import { ApolloServer } from "@apollo/server";
import { expressMiddleware } from "@apollo/server/express4";
import { typeDefs } from "./graphql/schema";
import { resolvers } from "./graphql/resolvers";
import db from "./db";
import { getUserFromToken } from "./graphql/context";
import { serverConfig } from "./config";
import { Context } from "./types";

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
          const user = null; // toto je jen zástupné, pak odstraň

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
