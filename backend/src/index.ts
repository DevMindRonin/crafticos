import "dotenv/config";
import express from "express";
import cors from "cors";
import { ApolloServer } from "@apollo/server";
import { expressMiddleware } from "@apollo/server/express4";
import { typeDefs } from "./graphql/schema";
import { resolvers } from "./graphql/resolvers";
import db from "./db";
import { getUserFromToken } from "./graphql/context";

async function startServer() {
  const app = express();
  app.use(
    cors({
      origin: process.env.FRONTEND_URL, // Povolí přístupy z frontendu
      credentials: true, // Povolí cookies a autorizace
    }),
  );
  app.use(express.json());

  const server = new ApolloServer({
    typeDefs,
    resolvers,
  });

  await server.start();

  app.use(
    "/graphql",
    expressMiddleware(server, {
      context: async ({ req }) => {
        // Authorization: Bearer <token>
        const token = req.headers.authorization?.split(" ")[1];
        const user = token ? getUserFromToken(token) : null;

        console.log("Decoded User:", user); // Ověřte, zda je user správně dekódován

        return { db, user };
      },
    }),
  );

  app.listen(process.env.BACKEND_PORT, () => {
    console.log(`Server running on ${process.env.BACKEND_URL}`);
    console.log(`GraphQL endpoint: ${process.env.BACKEND_URL}/graphql`);
  });
}

startServer();
