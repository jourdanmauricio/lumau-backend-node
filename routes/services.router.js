const express = require('express');
const passport = require('passport');

const { checkAuthRoute } = require('./../middlewares/auth.handler');

const ServiceService = require('../services/service.service');

const validatorHandler = require('../middlewares/validator.handler');
const {
  createServiceSchema,
  updateServiceSchema,
  getServiceSchema,
} = require('../schemas/service.schema');

const router = express.Router();
const serviceService = new ServiceService();

router.get('/', async (req, res, next) => {
  try {
    const url = req.headers['url'];

    const services = await serviceService.find(url);
    res.status(200).json(services);
  } catch (error) {
    next(error);
  }
});

router.post(
  '/',
  passport.authenticate('jwt', { session: false }),
  validatorHandler(createServiceSchema, 'body'),
  checkAuthRoute('Servicios'),
  async (req, res) => {
    const body = req.body;
    const { sub } = req.user;
    body.userId = sub;

    const newService = await serviceService.create(body);
    res.status(201).json(newService);
  },
);

router.put(
  '/:id',
  passport.authenticate('jwt', { session: false }),
  validatorHandler(getServiceSchema, 'params'),
  validatorHandler(updateServiceSchema, 'body'),
  checkAuthRoute('Servicios'),
  async (req, res, next) => {
    try {
      const { id } = req.params;
      const body = req.body;
      const service = await serviceService.update(id, body);
      res.status(200).json(service);
    } catch (error) {
      next(error);
    }
  },
);

router.delete(
  '/:id',
  passport.authenticate('jwt', { session: false }),
  validatorHandler(getServiceSchema, 'params'),
  checkAuthRoute('Servicios'),
  async (req, res, next) => {
    try {
      const { id } = req.params;
      const rta = await serviceService.delete(id);
      res.status(200).json(rta);
    } catch (error) {
      next(error);
    }
  },
);

module.exports = router;
