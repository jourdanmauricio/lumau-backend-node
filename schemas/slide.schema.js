const Joi = require('joi');

const id = Joi.number().integer();
const title = Joi.string().allow('');
const slug = Joi.string().allow('');
const excerpt = Joi.string().allow('');
const content = Joi.string().allow('');
const image = Joi.string().allow('');
const altImage = Joi.string().allow('');
const type = Joi.string().allow('');
const order = Joi.number().allow('');

const createSlideSchema = Joi.object({
  title,
  slug,
  excerpt,
  content,
  image,
  altImage,
  type,
  order,
});

const updateSlideSchema = Joi.object({
  title,
  slug,
  excerpt,
  content,
  image,
  altImage,
  type,
  order,
});

const getSlideSchema = Joi.object({
  id: id.required(),
});

module.exports = { createSlideSchema, updateSlideSchema, getSlideSchema };
