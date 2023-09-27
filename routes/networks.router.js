const express = require('express');
const passport = require('passport');

const validatorHandler = require('../middlewares/validator.handler');
const {
  createNetworkSchema,
  updateNetworkSchema,
  getNetworkSchema,
} = require('../schemas/network.schema');

const NetworkService = require('../services/network.service');
const networkService = new NetworkService();

const router = express.Router();

router.get('/', async (req, res, next) => {
  try {
    const url = req.headers['url'];
    const networks = await networkService.find(url);
    res.json(networks);
  } catch (error) {
    next(error);
  }
});

router.get(
  '/:id',
  validatorHandler(getNetworkSchema, 'params'),
  async (req, res, next) => {
    try {
      const { id } = req.params;
      const network = await networkService.findOne(id);
      res.json(network);
    } catch (error) {
      next(error);
    }
  },
);

router.post(
  '/',
  passport.authenticate('jwt', { session: false }),
  validatorHandler(createNetworkSchema, 'body'),
  async (req, res, next) => {
    try {
      const body = req.body;
      const { sub } = req.user;
      body.userId = sub;

      const network = await networkService.create(body);
      res.status(201).json(network);
    } catch (error) {
      next(error);
    }
  },
);

router.put(
  '/:id',
  passport.authenticate('jwt', { session: false }),
  validatorHandler(getNetworkSchema, 'params'),
  validatorHandler(updateNetworkSchema, 'body'),
  async (req, res, next) => {
    try {
      const { id } = req.params;
      const body = req.body;
      const network = await networkService.update(id, body);
      res.json(network);
    } catch (error) {
      next(error);
    }
  },
);

router.delete(
  '/:id',
  passport.authenticate('jwt', { session: false }),
  validatorHandler(getNetworkSchema, 'params'),
  async (req, res, next) => {
    try {
      const { id } = req.params;
      const rta = await networkService.delete(id);
      res.json(rta);
    } catch (error) {
      next(error);
    }
  },
);

module.exports = router;
