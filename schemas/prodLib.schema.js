const Joi = require('joi');

const id = Joi.string().max(255);
const name = Joi.string().max(255);
const category = Joi.string().max(255);
const categoryWeb = Joi.string().max(255);
const status = Joi.string().max(20);
const costPrice = Joi.number().positive().allow(0);
const iva = Joi.number().positive().allow(0);
const price = Joi.number().positive().allow(0);
const wholesalePrice = Joi.number().positive().allow(0);
const maxPrice = Joi.number().positive().allow(0);
const supplier = Joi.string().max(255);
const other = Joi.number().positive().allow(0);
const slug = Joi.string().max(255);
const excerpt = Joi.string().max(255);
const content = Joi.string().max(5000);
const image = Joi.string().allow('');
const altImage = Joi.string().allow('');
const type = Joi.string().allow('');
const sections = Joi.array().allow('');
const order = Joi.number();

const createProdLibSchema = Joi.object({
  id: id.required(),
  name: name.required(),
  category: category.required(),
  categoryWeb,
  status: status.required(),
  costPrice: costPrice,
  iva: iva,
  price: price.required(),
  wholesalePrice: wholesalePrice,
  maxPrice,
  supplier,
  other,
  slug,
  excerpt,
  content,
  image,
  altImage,
  type,
  sections,
  order,
});

const updateProdLibSchema = Joi.object({
  id,
  name,
  category,
  categoryWeb,
  status,
  costPrice,
  iva,
  price,
  wholesalePrice,
  maxPrice,
  supplier,
  other,
  slug,
  excerpt,
  content,
  image,
  altImage,
  type,
  sections,
  order,
});

const getProdLibSchema = Joi.object({
  id: id.required(),
});

module.exports = { createProdLibSchema, updateProdLibSchema, getProdLibSchema };
