const Joi = require('joi');

const id = Joi.number();
const name = Joi.string().max(255);
const value = Joi.string().max(5000);

const createFeatureSchema = Joi.object({
  name: name.required(),
  value: value.required(),
});

const updateFeatureSchema = Joi.object({
  name,
  value,
});

const getFeatureSchema = Joi.object({
  id: id.required(),
});

module.exports = {
  createFeatureSchema,
  updateFeatureSchema,
  getFeatureSchema,
};
