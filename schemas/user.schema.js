const Joi = require('joi');

const id = Joi.number();
const name = Joi.string().min(3).max(150);
const attributes = Joi.array();
const email = Joi.string().min(3).max(250);
const password = Joi.string().min(8);
const url = Joi.string().uri().min(3).max(250);
const phone = Joi.string().allow('').max(50);
const dni = Joi.string().allow('').min(8);
const deploy = Joi.string().min(3).max(50);
const role = Joi.string().max(10);

const createUserSchema = Joi.object({
  name: name.required(),
  attributes,
  email: email.required(),
  password: password.required(),
  url: url.required(),
  phone,
  dni,
  deploy: deploy.required(),
  role: role.required(),
});

const updateUserSchema = Joi.object({
  name,
  attributes,
  email,
  password,
  url,
  phone,
  dni,
  deploy,
  role,
});

const getUserSchema = Joi.object({
  id: id.required(),
});

module.exports = { createUserSchema, updateUserSchema, getUserSchema };
