const Joi = require('joi');

const id = Joi.number();
const name = Joi.string().min(3).max(150);
const attributes = Joi.array();
const email = Joi.string().min(3).max(250);
const password = Joi.string().min(8);
const recoveryToken = Joi.string().allow('').max(250);
const url = Joi.string().min(3).max(250);
const repo = Joi.string().allow('').max(255);
const phone = Joi.string().allow('').max(50);
const dni = Joi.string().allow('').min(8);
const image = Joi.string().allow('').max(250);
const altImage = Joi.string().allow('').max(250);
const deploy = Joi.string().min(3).max(50);
const role = Joi.string().max(10);
const username = Joi.string().max(255);
const cloudName = Joi.string().allow('').max(100);
const cloudFolder = Joi.string().allow('').max(100);
const cloudApiKey = Joi.string().allow('').max(100);
const cloudPreset = Joi.string().allow('').max(100);
const cloudSecret = Joi.string().allow('').max(50);
const instagramUser = Joi.string().allow('');
const instagramToken = Joi.string().allow('');

const createUserSchema = Joi.object({
  name: name.required(),
  attributes,
  email: email.required(),
  password: password.required(),
  url: url.required(),
  repo,
  phone,
  dni,
  image,
  altImage,
  deploy: deploy.required(),
  role: role.required(),
  username: username.required(),
  cloudName,
  cloudFolder,
  cloudApiKey,
  cloudPreset,
  cloudSecret,
  instagramUser,
  instagramToken,
});

const updateUserSchema = Joi.object({
  name,
  attributes,
  email,
  password,
  recoveryToken,
  url,
  repo,
  phone,
  dni,
  image,
  altImage,
  deploy,
  role,
  username,
  cloudName,
  cloudFolder,
  cloudApiKey,
  cloudPreset,
  cloudSecret,
  instagramUser,
  instagramToken,
});

const getUserSchema = Joi.object({
  id: id.required(),
});

module.exports = { createUserSchema, updateUserSchema, getUserSchema };
