import { gql } from "@apollo/client";

export const CREATE_WORKER = gql`
  mutation CreateWorker($input: WorkerInput) {
    createWorker(input: $input) {
      id
      name
      email
      password
      token
    }
  }
`;

export const CREATE_CLIENT = gql`
  mutation CreateClient($client: ClientInput) {
    createClient(client: $client) {
      id
      firstName
      lastName
      phone
      address
    }
  }
`;

export const UPDATE_CLIENT = gql`
  mutation UpdateClient($updateClientId: ID!, $client: ClientInput) {
    updateClient(id: $updateClientId, client: $client) {
      id
      firstName
      lastName
      phone
      address
    }
  }
`;
export const CREATE_NOTE_ENTRY = gql`
  mutation CreateNote($note: NoteInput!) {
    createNote(note: $note) {
      id
      note
      clientId
      createdAt
    }
  }
`;

export const LOGIN_USER = gql`
  mutation LoginWorker($input: WorkerLogin) {
    loginWorker(input: $input) {
      id
      name
      email
      password
      token
    }
  }
`;

export const DELETE_NOTE = gql`
  mutation DeleteNote($deleteNoteId: ID!) {
    deleteNote(id: $deleteNoteId) {
      id
      note
      clientId
    }
  }
`;

export const UPDATE_NOTE = gql`
  mutation UpdateNote($updateNoteId: ID!, $note: NoteInput!) {
    updateNote(id: $updateNoteId, note: $note) {
      id
      note
      clientId
    }
  }
`;
