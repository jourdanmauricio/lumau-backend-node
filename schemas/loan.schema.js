const Joi = require('joi');

const id = Joi.number();
const type = Joi.string().max(100);
const maxQuantityQuotes = Joi.number();
const maxAmount = Joi.number();
const rate = Joi.number();

const createLoanSchema = Joi.object({
  type: type.required(),
  maxQuantityQuotes: maxQuantityQuotes.required(),
  maxAmount: maxAmount.required(),
  rate: rate.required(),
});

const updateLoanSchema = Joi.object({
  type,
  maxQuantityQuotes,
  maxAmount,
  rate,
});

const getLoanSchema = Joi.object({
  id: id.required(),
});

module.exports = {
  createLoanSchema,
  updateLoanSchema,
  getLoanSchema,
};
