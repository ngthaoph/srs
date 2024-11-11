const { Note, validateNote } = require("../../models/note");
const { GraphQLError } = require("graphql");
const Joi = require("joi");

const resolvers = {
  Query: {
    notes: async () => {
      const notes = await Note.find();
      console.log(notes);
      return notes;
    },
    note: async (parent, args) => {
      const note = await Note.findById(args.id);
      if (!note) throw new GraphQLError("Note not found");
      return note;
    },
    noteByClientId: async (parent, args) => {
      const notes = await Note.find({ clientId: args.clientId });
      return notes;
    },
  },
  Mutation: {
    createNote: async (parent, args) => {
      const { error, value } = validateNote(args.note);
      const note = new Note(args.note);
      console.log(note);
      note.save();

      return note;
    },
    updateNote: async (parent, args) => {
      const { error } = validateNote(args.note);
      if (error) throw new GraphQLError(error.details[0].message);

      const note = await Note.findByIdAndUpdate(args.id, args.note, {
        new: true,
      });

      if (!note) throw new GraphQLError("Note not found");

      return note;
    },
    deleteNote: async (parent, args) => {
      const note = await Note.findByIdAndDelete(args.id);
      

      if (!note) throw new GraphQLError("Note not found");
    },
  },
};

module.exports = resolvers;
