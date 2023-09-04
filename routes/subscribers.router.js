const express = require('express');
const passport = require('passport');

const validatorHandler = require('./../middlewares/validator.handler');
const {
  createSubscriberSchema,
  updateSubscriberSchema,
  getSubscriberSchema,
} = require('./../schemas/subscriber.schema');
const SubscriberService = require('../services/subscriber.service');
const subscriberService = new SubscriberService();
const UserService = require('../services/user.service');
const userService = new UserService();

const router = express.Router();

router.get(
  '/',
  passport.authenticate('jwt', { session: false }),
  async (req, res) => {
    const { sub } = req.user;
    const subscribers = await subscriberService.find(sub);
    res.json(subscribers);
  },
);

router.get(
  '/:id',
  passport.authenticate('jwt', { session: false }),
  validatorHandler(getSubscriberSchema, 'params'),
  async (req, res, next) => {
    try {
      const { id } = req.params;
      const subscriber = await subscriberService.findOne(id);
      res.json(subscriber);
    } catch (error) {
      next(error);
    }
  },
);

router.post(
  '/',
  validatorHandler(createSubscriberSchema, 'body'),
  async (req, res, next) => {
    const body = req.body;
    const { url } = req.body;
    try {
      const user = await userService.findByUrl(url);
      body.userId = user.id;

      const subscriber = await subscriberService.create(body);
      res.status(201).json(subscriber);
    } catch (error) {
      next(error);
    }
  },
);

router.put(
  '/:id',
  passport.authenticate('jwt', { session: false }),
  validatorHandler(getSubscriberSchema, 'params'),
  validatorHandler(updateSubscriberSchema, 'body'),
  async (req, res, next) => {
    try {
      const { id } = req.params;
      const body = req.body;
      const subscriber = await subscriberService.update(id, body);
      res.json(subscriber);
    } catch (error) {
      next(error);
    }
  },
);

router.delete(
  '/:id',
  passport.authenticate('jwt', { session: false }),
  validatorHandler(getSubscriberSchema, 'params'),
  // validatorHandler(updateSubscriberSchema, 'body'),
  async (req, res) => {
    const { id } = req.params;
    const rta = await subscriberService.delete(id);
    res.json(rta);
  },
);

module.exports = router;
