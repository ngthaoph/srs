const mongoose = require("mongoose");
const Joi = require("joi");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const config = require("config");

const workerSchema = new mongoose.Schema({
  name: String,
  email: String,

  password: String,
});
function validateWorker(worker) {
  const schema = Joi.object({
    name: Joi.string().required(),

    email: Joi.string().email().required(),
    password: Joi.string().required(),
  });
  return schema.validate(worker);
}
workerSchema.pre("save", async function () {
  if (this.isModified("password")) {
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
  }
});
workerSchema.methods.comparePassword = async function (password) {
  return await bcrypt.compare(password, this.password);
};
workerSchema.methods.generateAuthToken = function () {
  const token = jwt.sign(
    {
      _id: this.id,
      name: this.name,
      email: this.email,
    },
    config.get("appPrivateKey")
  );

  return token;
};

const Worker = mongoose.model("Worker", workerSchema);

module.exports.Worker = Worker;
module.exports.validateWorker = validateWorker;
