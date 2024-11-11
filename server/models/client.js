const mongoose = require("mongoose");
const Joi = require("joi");
Joi.objectId = require("joi-objectId")(Joi);

const clientSchema = new mongoose.Schema(
  {
    firstName: String,
    lastName: String,
    phone: String,
    address: String,
  },
  {
    timestamps: true,
  }
);
function validateClient(client) {
  const schema = Joi.object({
    firstName: Joi.string().required(),
    lastName: Joi.string().required(),
    phone: Joi.string().allow(null, "").optional(), // Allows null
    address: Joi.string().allow(null, "").optional(),
  });

  return schema.validate(client);
}

const Client = mongoose.model("Client", clientSchema);

module.exports.Client = Client;
module.exports.validateClient = validateClient;
