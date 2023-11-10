const express = require('express');
const { checkAuthRoute } = require('./../middlewares/auth.handler');

const router = express.Router();
const passport = require('passport');

const InstagramService = require('../services/instagram.service');
const instagramService = new InstagramService();

router.get('/', async (req, res, next) => {
  try {
    const url = req.headers['url'];
    const posts = await instagramService.find(url);
    res.status(200).json(posts);
  } catch (error) {
    next(error);
  }
});

router.post(
  '/changeAuthInstagram',
  passport.authenticate('jwt', { session: false }),
  // validatorHandler(createPostSchema, 'body'),
  checkAuthRoute('Instagram'),
  async (req, res, next) => {
    try {
      const body = req.body;
      const { sub } = req.user;

      const rta = await instagramService.changeAuthInstagram(sub, body);
      res.status(201).json(rta);
    } catch (error) {
      next(error);
    }
  },
);

router.post(
  '/',
  passport.authenticate('jwt', { session: false }),
  // validatorHandler(createPostSchema, 'body'),
  checkAuthRoute('Instagram'),
  async (req, res, next) => {
    try {
      const { sub } = req.user;

      const rta = await instagramService.create(sub);
      res.status(201).json(rta);
    } catch (error) {
      next(error);
    }
  },
);

router.put(
  '/:id',
  passport.authenticate('jwt', { session: false }),
  checkAuthRoute('Instagram'),
  async (req, res, next) => {
    try {
      const { id } = req.params;
      const body = req.body;
      const post = await instagramService.update(id, body);
      res.status(200).json(post);
    } catch (error) {
      next(error);
    }
  },
);

router.delete(
  '/:id',
  passport.authenticate('jwt', { session: false }),
  //validatorHandler(getPostSchema, 'params'),
  checkAuthRoute('Instagram'),
  async (req, res, next) => {
    try {
      const { id } = req.params;
      const rta = await instagramService.delete(id);
      res.status(200).json(rta);
    } catch (error) {
      next(error);
    }
  },
);

module.exports = router;
