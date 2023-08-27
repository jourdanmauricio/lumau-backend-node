const Joi = require('joi');

const id = Joi.number();
const name = Joi.string().max(200);
const email = Joi.string().min(3).max(250);
const phone = Joi.string().max(50);
const comment = Joi.string();
const url = Joi.string().uri();

const createContactSchema = Joi.object({
  name: name,
  email: email.required(),
  phone,
  comment: comment.required(),
  url: url.required(),
});

const updateContactSchema = Joi.object({
  name,
  email,
  phone,
  comment,
});

const getContactSchema = Joi.object({
  id: id.required(),
});

module.exports = {
  createContactSchema,
  updateContactSchema,
  getContactSchema,
};
