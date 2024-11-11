const gql = require("graphql-tag");

const workerType = gql`
  type Worker {
    id: ID!
    name: String!
    email: String!

    password: String
    token: String
  }

  input WorkerInput {
    name: String!
    email: String!

    password: String!
  }
  input WorkerLogin {
    email: String!
    password: String!
  }
  type Query {
    worker(id: ID): Worker
    workers: [Worker!]
  }
  type Mutation {
    createWorker(input: WorkerInput): Worker
    loginWorker(input: WorkerLogin): Worker
    updateWorker(id: ID!, worker: WorkerInput): Worker
    deleteWorker(id: ID!): Worker
  }
`;
module.exports = workerType;
