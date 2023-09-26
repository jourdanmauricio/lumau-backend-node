const Joi = require('joi');

const id = Joi.number();
const city = Joi.string().max(100);
const cp = Joi.string().max(10);
const address = Joi.string().max(150);
const province = Joi.string().max(50);
const lat = Joi.string().max(50);
const lng = Joi.string().max(50);
const phone = Joi.string().allow('').max(50);
const email = Joi.string().allow('').max(250);
const order = Joi.number();

const createOfficeSchema = Joi.object({
  city: city.required(),
  cp: cp.required(),
  address: address.required(),
  province: province.required(),
  lat,
  lng,
  phone,
  email,
  order,
});

const updateOfficeSchema = Joi.object({
  city,
  cp,
  address,
  province,
  lat,
  lng,
  phone,
  email,
  order,
});

const getOfficeSchema = Joi.object({
  id: id.required(),
});

module.exports = {
  createOfficeSchema,
  updateOfficeSchema,
  getOfficeSchema,
};
