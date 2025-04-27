import { gql } from "@apollo/client";

export const GET_NOTES = gql`
  query GetNotes {
    getNotes {
      id
      text
      created_at
      __typename
    }
  }
`;

export const DELETE_NOTE = gql`
  mutation DeleteNote($id: ID!) {
    deleteNote(id: $id) {
      id
      __typename
    }
  }
`;

export const UPDATE_NOTE = gql`
  mutation UpdateNote($id: ID!, $text: String!) {
    updateNote(id: $id, text: $text) {
      id
      text
      __typename
    }
  }
`;

export const ADD_NOTE = gql`
  mutation AddNote($text: String!) {
    addNote(text: $text) {
      id
      text
      created_at
      __typename
    }
  }
`;
