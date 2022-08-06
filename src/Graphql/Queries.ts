import { gql } from "@apollo/client";

export const GET_ALL_USERS = gql`
  query getAllUsers {
    getAllUsers {
      id
      username
      password
    }
  }
`;

export const GET_ALL_GUESTS = gql`
  query getAllGuests($accessToken: String!) {
    getAllGuests(accessToken: $accessToken) {
      id
      name
      accept
      attending
    }
  }
`