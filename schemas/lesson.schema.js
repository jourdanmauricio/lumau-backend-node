const Joi = require('joi');

const id = Joi.number().positive();
const type = Joi.string().min(3).max(100);
const days = Joi.string().min(3).max(100);
const hours = Joi.string().min(3).max(100);
const order = Joi.number();

const getLessonSchema = Joi.object({
  id: id.required(),
});

const createLessonSchema = Joi.object({
  type,
  days: days.required(),
  hours: hours.required(),
  order,
});

const updateLessonSchema = Joi.object({
  type,
  days,
  hours,
  order,
});

module.exports = { getLessonSchema, createLessonSchema, updateLessonSchema };
