import { gql } from "graphql-tag";

export const queriesTypesDefs = gql`
  type Query {
    getNotes: [Note!]!
    getNoteById(id: ID!): Note
    getUserByEmail(email: String!): User
    currentUser: User
  }
`;
