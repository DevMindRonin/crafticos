import { gql } from "@apollo/client";

export const GET_USER_QUERY = gql`
  query GetUser($email: String!) {
    user(email: $email) {
      id
      email
      name
      role
    }
  }
`;

export const LOGIN_MUTATION = gql`
  mutation Login($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      token
      user {
        id
        email
        name
        role
      }
    }
  }
`;

export const REGISTER_MUTATION = gql`
  mutation Register(
    $email: String!
    $password: String
    $name: String!
    $role: Role!
  ) {
    register(email: $email, password: $password, name: $name, role: $role) {
      token
      user {
        id
        email
        name
        role
      }
    }
  }
`;
