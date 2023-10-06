const express = require('express');
const passport = require('passport');

const { checkAuthRoute } = require('./../middlewares/auth.handler');

const validatorHandler = require('../middlewares/validator.handler');
const {
  createPostSchema,
  updatePostSchema,
  getPostSchema,
} = require('../schemas/post.schema');

const router = express.Router();
const PostService = require('../services/post.service');
const postService = new PostService();

router.get('/', async (req, res, next) => {
  try {
    const url = req.headers['url'];

    const posts = await postService.find(url);
    res.status(200).json(posts);
  } catch (error) {
    next(error);
  }
});

router.post(
  '/',
  passport.authenticate('jwt', { session: false }),
  validatorHandler(createPostSchema, 'body'),
  checkAuthRoute('Posts'),
  async (req, res) => {
    const body = req.body;
    const { sub } = req.user;
    body.userId = sub;

    const newPost = await postService.create(body);
    res.status(201).json(newPost);
  },
);

router.put(
  '/:id',
  passport.authenticate('jwt', { session: false }),
  validatorHandler(getPostSchema, 'params'),
  validatorHandler(updatePostSchema, 'body'),
  checkAuthRoute('Posts'),
  async (req, res, next) => {
    try {
      const { id } = req.params;
      const body = req.body;
      const post = await postService.update(id, body);
      res.status(200).json(post);
    } catch (error) {
      next(error);
    }
  },
);

router.delete(
  '/:id',
  passport.authenticate('jwt', { session: false }),
  validatorHandler(getPostSchema, 'params'),
  checkAuthRoute('Posts'),
  async (req, res, next) => {
    try {
      const { id } = req.params;
      const rta = await postService.delete(id);
      res.status(200).json(rta);
    } catch (error) {
      next(error);
    }
  },
);

module.exports = router;
