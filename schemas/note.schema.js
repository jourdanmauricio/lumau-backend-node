const Joi = require('joi');

const id = Joi.number();
const name = Joi.string().max(255);
const value = Joi.string().max(5000);

const createNoteSchema = Joi.object({
  name: name.required(),
  value: value.required(),
});

const updateNoteSchema = Joi.object({
  name,
  value,
});

const getNoteSchema = Joi.object({
  id: id.required(),
});

module.exports = {
  createNoteSchema,
  updateNoteSchema,
  getNoteSchema,
};
