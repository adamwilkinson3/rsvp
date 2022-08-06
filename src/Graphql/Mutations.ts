import { gql } from "@apollo/client";

export const CREATE_USER = gql`
  mutation createUser($username: String!, $password: String!) {
    createUser(username: $username, password: $password) {
      successful
      message
    }
  }
`;

export const AUTHENTICATE_USER = gql`
  mutation authenticateUser(
    $username: String!
    $password: String!
  ) {
  authenticateUser(
    username: $username
    password: $password
  ) {
      successful
      message
    }
  }
`
export const DELETE_USER = gql`
  mutation deleteUser($accessToken: String!) {
    deleteUser(accessToken: $accessToken) {
      message
    }
  }
`;

export const CREATE_GUEST = gql`
  mutation createGuest($name: String!, $accept: Boolean!, $attending: Int!, $ownerId: Int!) {
    createGuest(name: $name, accept: $accept, attending: $attending, ownerId: $ownerId) {
      name
      accept
      attending
      ownerId
    }
  }
`;

export const DELETE_GUEST = gql`
  mutation deleteGuest($id: ID!) {
    deleteGuest(id: $id) {
      message
    }
  }
`