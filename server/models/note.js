const mongoose = require("mongoose");
const Joi = require("joi");
Joi.objectId = require("joi-objectId")(Joi);

const noteSchema = new mongoose.Schema(
  {
    note: String,
    clientId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Client",
      required: true,
    },
  },
  { timestamps: true }
);
function validateNote(note) {
  const schema = Joi.object({
    note: Joi.string().required(),
    clientId: Joi.objectId().required(),
  });

  return schema.validate(note);
}
const Note = mongoose.model("Note", noteSchema);

module.exports.Note = Note;
module.exports.validateNote = validateNote;
