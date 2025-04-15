import { gql } from "graphql-tag";
export const GET_NOTES = gql`
  query GetNotes {
    getNotes {
      id
      text
      created_at
    }
  }
`;
