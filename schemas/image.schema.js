const Joi = require('joi');

const id = Joi.number();
const assetId = Joi.string().max(100);
const bytes = Joi.number();
const etag = Joi.string().max(100);
const folder = Joi.string().max(100);
const format = Joi.string().max(10);
const height = Joi.number();
const width = Joi.number();
const originalFilename = Joi.string().max(255);
const publicId = Joi.string().max(100);
const resourceType = Joi.string().max(50);
const secureUrl = Joi.string().max(255);
const signature = Joi.string().max(255);
const type = Joi.string().max(50);
const url = Joi.string().max(255);

const createImageSchema = Joi.object({
  assetId: assetId.required(),
  bytes: bytes.required(),
  etag: etag.required(),
  folder: folder.required(),
  format: format.required(),
  height: height.required(),
  width: width.required(),
  originalFilename: originalFilename.required(),
  publicId: publicId.required(),
  resourceType: resourceType.required(),
  secureUrl: secureUrl.required(),
  signature: signature.required(),
  type: type.required(),
  url: url.required(),
});

const updateImageSchema = Joi.object({
  assetId,
  bytes,
  etag,
  folder,
  format,
  height,
  width,
  originalFilename,
  publicId,
  resourceType,
  secureUrl,
  signature,
  type,
  url,
});

const getImageSchema = Joi.object({
  id: id.required(),
});

module.exports = {
  createImageSchema,
  updateImageSchema,
  getImageSchema,
};
