export const noteTypeDefs = `#graphql
  type Note {
    id: ID!
    text: String!
    created_at: String!
  }

  type DeleteNoteResponse {
    id: String!
  }
`;
