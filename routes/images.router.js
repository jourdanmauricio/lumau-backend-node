const express = require('express');
const passport = require('passport');

const validatorHandler = require('../middlewares/validator.handler');
const { checkAuthRoute } = require('./../middlewares/auth.handler');
const {
  createImageSchema,
  updateImageSchema,
  getImageSchema,
} = require('../schemas/image.schema');

const ImageService = require('../services/image.service');
const imageService = new ImageService();

const router = express.Router();

router.get('/', async (req, res, next) => {
  try {
    const url = req.headers['url'];

    const images = await imageService.find(url);
    res.json(images);
  } catch (error) {
    next(error);
  }
});

router.get(
  '/:id',
  validatorHandler(getImageSchema, 'params'),
  async (req, res, next) => {
    try {
      const { id } = req.params;
      const image = await imageService.findOne(id);
      res.json(image);
    } catch (error) {
      next(error);
    }
  },
);

router.post(
  '/',
  passport.authenticate('jwt', { session: false }),
  validatorHandler(createImageSchema, 'body'),
  checkAuthRoute('Imágenes'),
  async (req, res, next) => {
    try {
      const body = req.body;
      const { sub } = req.user;
      body.userId = sub;

      const image = await imageService.create(body);
      res.status(201).json(image);
    } catch (error) {
      next(error);
    }
  },
);

router.put(
  '/:id',
  passport.authenticate('jwt', { session: false }),
  validatorHandler(getImageSchema, 'params'),
  validatorHandler(updateImageSchema, 'body'),
  checkAuthRoute('Imágenes'),
  async (req, res, next) => {
    try {
      const { id } = req.params;
      const body = req.body;
      const image = await imageService.update(id, body);
      res.json(image);
    } catch (error) {
      next(error);
    }
  },
);

router.delete(
  '/:id',
  passport.authenticate('jwt', { session: false }),
  // validatorHandler(getImageSchema, 'params'),
  checkAuthRoute('Imágenes'),
  async (req, res, next) => {
    try {
      const { id } = req.params;
      const { sub } = req.user;
      const userId = sub;

      const rta = await imageService.delete(id, userId);
      res.json(rta);
    } catch (error) {
      next(error);
    }
  },
);

module.exports = router;
