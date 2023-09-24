const Joi = require('joi');
const id = Joi.number();
const name = Joi.string().max(20);
const resource = Joi.string().max(20);
const route = Joi.string().allow('').max(30);
const icon = Joi.string().allow('').max(20);
const description = Joi.string().allow('').max(5000);
const roles = Joi.array();

const createSectionSchema = Joi.object({
  name: name.required(),
  resource: resource.required(),
  route,
  icon,
  description,
  roles,
});

const updateSectionSchema = Joi.object({
  name,
  resource,
  route,
  icon,
  description,
  roles,
});

const getSectionSchema = Joi.object({
  id: id.required(),
});

module.exports = {
  createSectionSchema,
  updateSectionSchema,
  getSectionSchema,
};
