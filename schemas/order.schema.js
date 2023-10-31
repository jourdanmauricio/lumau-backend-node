const Joi = require('joi');

const id = Joi.number();
const buyer = Joi.array();
const items = Joi.array();
const amount = Joi.number().positive();
const payment = Joi.boolean();
const status = Joi.string().max(20);
const delivery = Joi.boolean();
const observation = Joi.string().allow('');
const deliveryInfo = Joi.array();

const createOrderSchema = Joi.object({
  id: id.required(),
  buyer: buyer.required(),
  items: items.required(),
  amount: amount.required(),
  payment: payment.required(),
  status: status.required(),
  delivery: delivery.required(),
  observation,
  deliveryInfo,
});

const updateOrderSchema = Joi.object({
  buyer,
  items,
  amount,
  payment,
  status,
  delivery,
  deliveryInfo,
});

const getOrderSchema = Joi.object({
  id: id.required(),
});

module.exports = { createOrderSchema, updateOrderSchema, getOrderSchema };
