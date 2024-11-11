const gql = require("graphql-tag");
const noteType = gql`
  type Note {
    id: ID!
    note: String!
    clientId: ID!
    createdAt: String
  }
  input NoteInput {
    note: String!
    clientId: ID!
  }
  type Query {
    note(id: ID!): Note
    notes: [Note!]
    noteByClientId(clientId: ID!): [Note]
  }
  type Mutation {
    createNote(note: NoteInput!): Note
    updateNote(id: ID!, note: NoteInput!): Note
    deleteNote(id: ID!): Note
  }
`;
module.exports = noteType;
