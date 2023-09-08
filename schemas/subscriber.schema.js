const Joi = require('joi');

const id = Joi.number();
const name = Joi.string().max(200);
const email = Joi.string().min(3).max(250);
// const userId = Joi.number();
const url = Joi.string().max(255);

const createSubscriberSchema = Joi.object({
  name: name,
  email: email.required(),
  // userId: userId.required(),
  url: url.required(),
});

const updateSubscriberSchema = Joi.object({
  name,
  email,
});

const getSubscriberSchema = Joi.object({
  id: id.required(),
});

module.exports = {
  createSubscriberSchema,
  updateSubscriberSchema,
  getSubscriberSchema,
};
