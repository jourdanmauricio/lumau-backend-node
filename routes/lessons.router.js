const express = require('express');
const passport = require('passport');

const { checkAuthRoute } = require('./../middlewares/auth.handler');

const validatorHandler = require('../middlewares/validator.handler');
const {
  createLessonSchema,
  updateLessonSchema,
  getLessonSchema,
} = require('../schemas/lesson.schema');

const router = express.Router();
const LessonService = require('../services/lesson.service');
const lessonService = new LessonService();

router.get('/', async (req, res, next) => {
  try {
    const url = req.headers['url'];

    const lessons = await lessonService.find(url);
    res.status(200).json(lessons);
  } catch (error) {
    next(error);
  }
});

router.post(
  '/',
  passport.authenticate('jwt', { session: false }),
  validatorHandler(createLessonSchema, 'body'),
  checkAuthRoute('Posts'),
  async (req, res) => {
    const body = req.body;
    const { sub } = req.user;
    body.userId = sub;

    const newLesson = await lessonService.create(body);
    res.status(201).json(newLesson);
  },
);

router.put(
  '/:id',
  passport.authenticate('jwt', { session: false }),
  validatorHandler(getLessonSchema, 'params'),
  validatorHandler(updateLessonSchema, 'body'),
  checkAuthRoute('Posts'),
  async (req, res, next) => {
    try {
      const { id } = req.params;
      const body = req.body;
      const lesson = await lessonService.update(id, body);
      res.status(200).json(lesson);
    } catch (error) {
      next(error);
    }
  },
);

router.delete(
  '/:id',
  passport.authenticate('jwt', { session: false }),
  validatorHandler(getLessonSchema, 'params'),
  checkAuthRoute('Posts'),
  async (req, res, next) => {
    try {
      const { id } = req.params;
      const rta = await lessonService.delete(id);
      res.status(200).json(rta);
    } catch (error) {
      next(error);
    }
  },
);

module.exports = router;
