import gql from "graphql-tag";

export const typeDefs = gql`
  type Note {
    id: ID!
    text: String!
  }

  type User {
    id: ID!
    email: String!
    role: String!
    name: String!
  }

  type AuthPayload {
    token: String!
    user: User!
  }

  type Query {
    getNotes: [Note!]!
    getNoteById(id: ID!): Note
    currentUser: User
  }

  type Mutation {
    addNote(text: String!): Note!
    updateNote(id: ID!, text: String!): Note!
    deleteNote(id: ID!): Boolean!
    register(email: String!, password: String!, name: String): AuthPayload!
    login(email: String!, password: String!): AuthPayload!
  }
`;
