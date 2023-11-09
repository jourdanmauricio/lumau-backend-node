const express = require('express');
const { checkAuthRoute } = require('./../middlewares/auth.handler');

const router = express.Router();
const InstagramService = require('../services/instagram.service');
const passport = require('passport');
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

module.exports = router;
