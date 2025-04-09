export const queryTypeDefs = `#graphql
  type Query {
    getNotes: [Note!]!
    getNoteById(id: ID!): Note
    getUserByEmail(email: String!): User
    currentUser: User
  }
`;
