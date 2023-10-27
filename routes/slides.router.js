const express = require('express');
const passport = require('passport');

const { checkAuthRoute } = require('../middlewares/auth.handler');

const validatorHandler = require('../middlewares/validator.handler');
const {
  createSlideSchema,
  updateSlideSchema,
  getSlideSchema,
} = require('../schemas/slide.schema');

const router = express.Router();
const SlideService = require('../services/slide.service');
const slideService = new SlideService();

router.get('/', async (req, res, next) => {
  try {
    const url = req.headers['url'];

    const slides = await slideService.find(url);
    res.status(200).json(slides);
  } catch (error) {
    next(error);
  }
});

router.post(
  '/',
  passport.authenticate('jwt', { session: false }),
  validatorHandler(createSlideSchema, 'body'),
  checkAuthRoute('Slides'),
  async (req, res) => {
    const body = req.body;
    const { sub } = req.user;
    body.userId = sub;

    const newSlide = await slideService.create(body);
    res.status(201).json(newSlide);
  },
);

router.put(
  '/:id',
  passport.authenticate('jwt', { session: false }),
  validatorHandler(getSlideSchema, 'params'),
  validatorHandler(updateSlideSchema, 'body'),
  checkAuthRoute('Slides'),
  async (req, res, next) => {
    try {
      const { id } = req.params;
      const body = req.body;
      const slide = await slideService.update(id, body);
      res.status(200).json(slide);
    } catch (error) {
      next(error);
    }
  },
);

router.delete(
  '/:id',
  passport.authenticate('jwt', { session: false }),
  validatorHandler(getSlideSchema, 'params'),
  checkAuthRoute('Slides'),
  async (req, res, next) => {
    try {
      const { id } = req.params;
      const rta = await slideService.delete(id);
      res.status(200).json(rta);
    } catch (error) {
      next(error);
    }
  },
);

module.exports = router;
