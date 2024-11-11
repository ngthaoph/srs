import { gql } from "@apollo/client";

export const GET_CLIENT = gql`
  query Client($clientId: ID!) {
    client(id: $clientId) {
      id
      firstName
      lastName
      phone
      address
    }
  }
`;

export const GET_CLIENTS = gql`
  query Clients {
    clients {
      id
      firstName
      lastName
      phone
      address
    }
  }
`;
export const GET_CLIENT_BY_NAMES = gql`
  query ClientByNames($input: ClientInput) {
    clientByNames(input: $input) {
      id
      firstName
      lastName
      phone
      address
    }
  }
`;
export const GET_WORKERS = gql`
  query Workers {
    workers {
      id
      name
      email
      password
      token
    }
  }
`;

export const GET_NOTES_BY_CLIENT_ID = gql`
  query NoteByClientId($clientId: ID!) {
    noteByClientId(clientId: $clientId) {
      id
      note
      clientId
      createdAt
    }
  }
`;
