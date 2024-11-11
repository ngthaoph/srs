const { Worker, validateWorker } = require("../../models/worker");
const { GraphQLError } = require("graphql");
const Joi = require("joi");
const _ = require("lodash");

const resolvers = {
  Query: {
    workers: async (parent, args, context) => {
      try {
        const workers = await Worker.find();
        return workers;
      } catch (error) {
        throw new GraphQLError(`Failed to get workers: ${error.message}`, {
          extensions: { code: "GET_WORKERS_ERROR" },
        });
      }
    },
    worker: async (parent, args, context) => {
      try {
        const worker = await Worker.findById(args.id);
        if (!worker) {
          throw new GraphQLError("Worker not found", {
            extensions: { code: "NOT_FOUND" },
            status: 404,
          });
        }
        return worker;
      } catch (error) {
        throw new GraphQLError(`Failed to get worker: ${error.message}`, {
          extensions: { code: "GET_WORKER_ERROR" },
        });
      }
    },
  },
  Mutation: {
    createWorker: async (parent, args, context) => {
      try {
        const { error, value } = validateWorker({
          name: args.input.name,
          email: args.input.email,
          password: args.input.password,
        });
        if (error) {
          throw new GraphQLError(`Invalid Worker ENTRY INPUT ${error}`, {
            extensions: { code: "INVALID_WORKER_ENTRY_INPUT" },
          });
        }
        const worker = new Worker({
          name: args.input.name,
          email: args.input.email,
          password: args.input.password,
        });
        worker.save();
        return worker;
      } catch (error) {
        throw new GraphQLError(`Failed to create worker ${error}`, {
          extensions: { code: "FAILED_TO_CREATE_WORKER" },
        });
      }
    },
    loginWorker: async (parent, args) => {
      const loginSchema = Joi.object({
        email: Joi.string().email().required(),
        password: Joi.string().required(),
      });
      const { error, value } = loginSchema.validate(args.input);

      if (error) {
        throw new GraphQLError(`Invalid Worker input ${error}`, {
          extensions: { code: "INVALID_WORKER_INPUT" },
        });
      }
      const worker = await Worker.findOne({ email: value.email });
      //const worker = await Worker.findOne({ email: args.input.email });
      if (!worker) {
        throw new GraphQLError("Invalid email or password", {
          extensions: { code: "INVALID_EMAIL_PASSWORD" },
          status: 400,
        });
      }
      const validPassword = await worker.comparePassword(
        value.password,
        worker.password
      );
      //const validPassword = await worker.comparePassword(args.input.password);
      if (!validPassword) {
        throw new GraphQLError("Invalid email or password", {
          extensions: { code: "INVALID_EMAIL_PASSWORD" },
          status: 400,
        });
      }
      let token = worker.generateAuthToken();
      // Pick only the necessary user data and add the auth token
      let workerData = _.pick(worker, ["id", "name", "email", "iAdmin"]);
      workerData.token = token;

      // Return the user data with the auth token
      return workerData;
    },

    updateWorker: async (parent, args, context) => {
      try {
        isAuthenticated(context);
        const worker = await Worker.findById(args.id);
        if (!worker) {
          throw new Error("Worker not found");
        }
        //Check if the worker is authorised to update the worker
        isAuthorized(worker, context);
        const { error, value } = validateWorker(args.worker);
        if (error) {
          throw new Error(`Invalid Worker input ${error}`);
        }
        //Update the worker with he validated input data
        // const updatedWorker = await Worker.findByIdAndUpdate(args.id, value, {
        //   new: true,
        // });
        const updatedWorker = await Worker.findByIdAndUpdate(args.id, value, {
          new: true,
        });
        //Return the updated worker data
        return updatedWorker;
      } catch (error) {
        throw new GraphQLError(error, {
          extensions: {
            code: "UPDATED_WORKER_ERROR",
          },
        });
      }
    },

    deleteWorker: async (parent, args, context) => {
      try {
        isAuthenticated(context);
        const worker = await Worker.findById(args.id);
        if (!worker) {
          throw new Error("Worker not found");
        }
        isAuthorized(worker, context);
        const deletedWorker = await Worker.findByIdAndDelete(args.id);
        return deletedWorker;
      } catch (error) {
        throw new GraphQLError(error, {
          extensions: {
            code: "DELETED_WORKER_ERROR",
          },
        });
      }
    },
  },
};

module.exports = resolvers;

function isAuthenticated(context) {
  if (!context.worker) {
    throw new GraphQLError("Not Authenticated", {
      extensions: { code: "UNAUTHENTICATED" },
      status: 401,
    });
  }
}
function isAuthorized(worker, context) {
  if (worker._id.toString() !== context.worker._id) {
    //is it the same user in the token
    throw new GraphQLError("Not authorized", {
      extensions: { code: "UNAUTHORIZED" },
      status: 403,
    });
  }
}
