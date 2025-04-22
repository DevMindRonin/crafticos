import { gql } from "@apollo/client";

export const GET_NOTES = gql`
  query GetNotes {
    getNotes {
      id
      text
      created_at
    }
  }
`;

export const DELETE_NOTE = gql`
  mutation DeleteNote($id: ID!) {
    deleteNote(id: $id)
  }
`;
