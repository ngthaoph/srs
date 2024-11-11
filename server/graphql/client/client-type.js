const gql = require("graphql-tag");
const clientType = gql`
  type Client {
    id: ID!
    firstName: String
    lastName: String
    phone: String
    address: String
  }
  input ClientInput {
    firstName: String
    lastName: String
    phone: String
    address: String
  }
  type Query {
    client(id: ID!): Client
    clients: [Client]
    clientByNames(input: ClientInput): [Client]
  }
  type Mutation {
    createClient(client: ClientInput): Client
    updateClient(id: ID!, client: ClientInput): Client
    deleteClient(id: ID!): Client
  }
`;
module.exports = clientType;
