const Joi = require('joi');

const id = Joi.number();
const name = Joi.string().max(200);
const value = Joi.array();
const description = Joi.string().max(255);
const userId = Joi.number();

const createFeatureSchema = Joi.object({
  name: name.required(),
  value: value.required(),
  userId: userId.required(),
  description,
});

const updateFeatureSchema = Joi.object({
  // name,
  value,
  description,
});

const getFeatureSchema = Joi.object({
  id: id.required(),
});

module.exports = {
  createFeatureSchema,
  updateFeatureSchema,
  getFeatureSchema,
};
