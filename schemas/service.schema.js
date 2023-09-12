const Joi = require('joi');

const id = Joi.number().integer();
const title = Joi.string();
const content = Joi.string().allow('');
const image = Joi.string();
const altImage = Joi.string();
const order = Joi.number();

const createServiceSchema = Joi.object({
  title: title.required(),
  content: content.required(),
  image: image.required(),
  altImage: altImage.required(),
  order,
});

const updateServiceSchema = Joi.object({
  title,
  content,
  image,
  altImage,
  order,
});

const getServiceSchema = Joi.object({
  id: id.required(),
});

module.exports = { createServiceSchema, updateServiceSchema, getServiceSchema };
