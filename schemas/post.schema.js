const Joi = require('joi');

const id = Joi.number().integer();
const title = Joi.string();
const slug = Joi.string();
const excerpt = Joi.string();
const content = Joi.string().allow('');
const image = Joi.string();
const altImage = Joi.string();
const type = Joi.string();
const sections = Joi.array();
const order = Joi.number();

const createPostSchema = Joi.object({
  title: title.required(),
  slug,
  excerpt,
  content: content.required(),
  image: image.required(),
  altImage: altImage.required(),
  type: type.required(),
  sections,
  order,
});

const updatePostSchema = Joi.object({
  title,
  slug,
  excerpt,
  content,
  image,
  altImage,
  type,
  sections,
  order,
});

const getPostSchema = Joi.object({
  id: id.required(),
});

module.exports = { createPostSchema, updatePostSchema, getPostSchema };
