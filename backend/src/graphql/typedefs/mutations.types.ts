export const mutationTypeDefs = `#graphql
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
    login(email: String!, password: String, isGoogleFlow: Boolean): AuthPayload
  }
`;
