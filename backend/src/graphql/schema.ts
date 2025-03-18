import gql from "graphql-tag";

export const typeDefs = gql`
  enum Role {
    USER
    ADMIN
  }

  type Note {
    id: ID!
    text: String!
  }

  type User {
    id: ID!
    email: String!
    name: String!
    role: Role!
  }

  type AuthPayload {
    token: String!
    user: User!
  }

  type Query {
    getUserByEmail(email: String!): User
    getNotes: [Note!]!
    getNoteById(id: ID!): Note
    currentUser: User
  }

  type Mutation {
    addNote(text: String!): Note!
    updateNote(id: ID!, text: String!): Note!
    deleteNote(id: ID!): Boolean!
    register(
      email: String!
      password: String
      name: String!
      role: Role!
    ): AuthPayload!
    login(email: String!, password: String, isGoogleFlow: Boolean): AuthPayload!
  }
`;
