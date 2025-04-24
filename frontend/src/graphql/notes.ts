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

export const UPDATE_NOTE = gql`
  mutation UpdateNote($id: ID!, $text: String!) {
    updateNote(id: $id, text: $text) {
      id
      text
    }
  }
`;

export const ADD_NOTE = gql`
  mutation AddNote($text: String!) {
    addNote(text: $text) {
      text
    }
  }
`;
