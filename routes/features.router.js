const express = require('express');
const passport = require('passport');

const validatorHandler = require('../middlewares/validator.handler');
const {
  createFeatureSchema,
  updateFeatureSchema,
  getFeatureSchema,
} = require('../schemas/feature.schema');
const FeatureService = require('../services/feature.service');
const { checkAdminRole } = require('../middlewares/auth.handler');
const featureService = new FeatureService();

const router = express.Router();

router.get(
  '/',
  passport.authenticate('jwt', { session: false }),
  async (req, res) => {
    const features = await featureService.find();
    res.json(features);
  },
);

router.get(
  '/user/:id',
  passport.authenticate('jwt', { session: false }),
  async (req, res) => {
    let userId;
    const jwtUser = req.user;
    if (jwtUser.role === 'admin') {
      userId = req.params.id;
    } else {
      userId = jwtUser.sub;
    }

    const features = await featureService.findByUser(userId);
    res.json(features);
  },
);

router.get(
  '/:id',
  passport.authenticate('jwt', { session: false }),
  validatorHandler(getFeatureSchema, 'params'),
  async (req, res, next) => {
    try {
      const { id } = req.params;
      const feature = await featureService.findOne(id);
      res.json(feature);
    } catch (error) {
      next(error);
    }
  },
);

router.post(
  '/',
  passport.authenticate('jwt', { session: false }),
  checkAdminRole,
  validatorHandler(createFeatureSchema, 'body'),
  async (req, res) => {
    const body = req.body;

    const feature = await featureService.upsert(body);
    res.status(201).json(feature);
  },
);

router.put(
  '/:id',
  passport.authenticate('jwt', { session: false }),
  validatorHandler(getFeatureSchema, 'params'),
  validatorHandler(updateFeatureSchema, 'body'),
  async (req, res, next) => {
    try {
      const { id } = req.params;
      const body = req.body;
      const feature = await featureService.update(id, body);
      res.json(feature);
    } catch (error) {
      next(error);
    }
  },
);

router.delete(
  '/:id',
  passport.authenticate('jwt', { session: false }),
  validatorHandler(getFeatureSchema, 'params'),
  // validatorHandler(updateSubscriberSchema, 'body'),
  async (req, res) => {
    const { id } = req.params;
    const rta = await featureService.delete(id);
    res.json(rta);
  },
);

module.exports = router;
