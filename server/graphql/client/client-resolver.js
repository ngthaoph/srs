const { Client, validateClient } = require("../../models/client.js");
const { GraphQLError } = require("graphql");
const Joi = require("joi");

const resolvers = {
  Query: {
    client: async (parent, args) => {
      const client = await Client.findById(args.id);

      if (!client) throw new GraphQLError("Property not found");

      return client;
    },
    clients: async (parent, args) => {
      try {
        const clients = await Client.find();
        console.log(clients);

        return clients;
      } catch (error) {
        throw new GraphQLError(`Failed to get clients: ${error.message}`, {
          extensions: { code: "GET_CLIENTS_ERROR" },
        });
      }
    },
    clientByNames: async (parent, args) => {
      const client = await Client.find({
        firstName: args.input.firstName,
        lastName: args.input.lastName,
        phone: args.input.phone,
        address: args.input.address,
      });
      return client;
    },
  },
  Mutation: {
    createClient: async (parent, args) => {
      try {
        const { error, value } = validateClient({
          firstName: args.client.firstName,
          lastName: args.client.lastName,
          phone: args.client.phone,
          address: args.client.address,
        });

        console.log("validation results:", { error, value });

        if (error) {
          throw new GraphQLError(`Invalid CREATE CLIENT:  ${error}`, {
            extensions: { code: "INVALID_CREATE_CLIENT" },
          });
        }

        const client = new Client({
          firstName: args.client.firstName,
          lastName: args.client.lastName,
          phone: args.client.phone,
          address: args.client.address,
        });
        console.log(client);
        await client.save();
        return client;
      } catch (error) {
        throw new GraphQLError(`Failed to create client: ${error.message}`, {
          extensions: { code: "CREATE_CLIENT_ERROR" },
        });
      }
    },
    updateClient: async (parent, args) => {
      const client = await Client.findById(args.id);
      if (!client) {
        throw new Error("User not found");
      }
      const { error, value } = validateClient(args.client);
      const updatedClient = await Client.findByIdAndUpdate(args.id, value);
      return updatedClient;
    },
    deleteClient: async (parent, args) => {
      const client = await Client.findById(args.id);

      if (!client) throw new GraphQLError("CLIENT not found");
      const deletedUser = await Client.findByIdAndDelete(args.id);
      deletedUser.save();
      return deletedUser;
    },
  },
};
module.exports = resolvers;
