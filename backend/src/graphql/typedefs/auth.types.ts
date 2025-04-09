export const authTypeDefs = `#graphql
  enum Role {
    USER
    ADMIN
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
`;
