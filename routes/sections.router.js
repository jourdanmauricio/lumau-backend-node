const express = require('express');
const passport = require('passport');

const validatorHandler = require('../middlewares/validator.handler');
const {
  createSectionSchema,
  updateSectionSchema,
  getSectionSchema,
} = require('../schemas/section.schema');
const { checkAdminRole } = require('../middlewares/auth.handler');
const SectionService = require('../services/section.service');
const sectionService = new SectionService();

const router = express.Router();

router.get(
  '/',
  passport.authenticate('jwt', { session: false }),
  async (req, res) => {
    const sections = await sectionService.find();
    res.json(sections);
  },
);

router.get(
  '/:id',
  passport.authenticate('jwt', { session: false }),
  validatorHandler(getSectionSchema, 'params'),
  async (req, res, next) => {
    try {
      const { id } = req.params;
      const section = await sectionService.findOne(id);
      res.json(section);
    } catch (error) {
      next(error);
    }
  },
);

router.post(
  '/',
  passport.authenticate('jwt', { session: false }),
  checkAdminRole,
  validatorHandler(createSectionSchema, 'body'),
  async (req, res) => {
    const body = req.body;
    const section = await sectionService.create(body);
    res.status(201).json(section);
  },
);

router.put(
  '/:id',
  passport.authenticate('jwt', { session: false }),
  checkAdminRole,
  validatorHandler(getSectionSchema, 'params'),
  validatorHandler(updateSectionSchema, 'body'),
  async (req, res, next) => {
    try {
      const { id } = req.params;
      const body = req.body;
      const section = await sectionService.update(id, body);
      res.json(section);
    } catch (error) {
      next(error);
    }
  },
);

router.delete(
  '/:id',
  passport.authenticate('jwt', { session: false }),
  validatorHandler(getSectionSchema, 'params'),
  // validatorHandler(updateSubscriberSchema, 'body'),
  async (req, res) => {
    const { id } = req.params;
    const rta = await sectionService.delete(id);
    res.json(rta);
  },
);

module.exports = router;
