const Joi = require('joi');

const id = Joi.number();
const facebook = Joi.string().allow('').max(255);
const instagram = Joi.string().allow('').max(255);
const twitter = Joi.string().allow('').max(255);
const whatsapp = Joi.string().allow('').max(255);
const telegram = Joi.string().allow('').max(255);
const youtube = Joi.string().allow('').max(255);

const createNetworkSchema = Joi.object({
  facebook,
  instagram,
  twitter,
  whatsapp,
  telegram,
  youtube,
});

const updateNetworkSchema = Joi.object({
  facebook,
  instagram,
  twitter,
  whatsapp,
  telegram,
  youtube,
});

const getNetworkSchema = Joi.object({
  id: id.required(),
});

module.exports = {
  createNetworkSchema,
  updateNetworkSchema,
  getNetworkSchema,
};
