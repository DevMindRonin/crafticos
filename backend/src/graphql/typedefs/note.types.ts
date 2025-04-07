import { gql } from "graphql-tag";

export const noteTypesDefs = gql`
  type Note {
    id: ID!
    text: String!
    createdAt: String!
  }
`;
