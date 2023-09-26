const express = require('express');
const passport = require('passport');

const validatorHandler = require('../middlewares/validator.handler');
const { checkAuthRoute } = require('./../middlewares/auth.handler');
const {
  createOfficeSchema,
  updateOfficeSchema,
  getOfficeSchema,
} = require('../schemas/office.schema');

const OfficeService = require('../services/office.service');
const officeService = new OfficeService();

const router = express.Router();

router.get('/', async (req, res, next) => {
  try {
    const url = req.headers['url'];
    const offices = await officeService.find(url);
    res.json(offices);
  } catch (error) {
    next(error);
  }
});

router.get(
  '/:id',
  validatorHandler(getOfficeSchema, 'params'),
  async (req, res, next) => {
    try {
      const { id } = req.params;
      const office = await officeService.findOne(id);
      res.json(office);
    } catch (error) {
      next(error);
    }
  },
);

router.post(
  '/',
  passport.authenticate('jwt', { session: false }),
  validatorHandler(createOfficeSchema, 'body'),
  checkAuthRoute('Oficinas'),
  async (req, res, next) => {
    try {
      const body = req.body;
      const { sub } = req.user;
      body.userId = sub;

      const office = await officeService.create(body);
      res.status(201).json(office);
    } catch (error) {
      next(error);
    }
  },
);

router.put(
  '/:id',
  passport.authenticate('jwt', { session: false }),
  validatorHandler(getOfficeSchema, 'params'),
  validatorHandler(updateOfficeSchema, 'body'),
  checkAuthRoute('Oficinas'),
  async (req, res, next) => {
    try {
      const { id } = req.params;
      const body = req.body;
      const office = await officeService.update(id, body);
      res.json(office);
    } catch (error) {
      next(error);
    }
  },
);

router.delete(
  '/:id',
  passport.authenticate('jwt', { session: false }),
  validatorHandler(getOfficeSchema, 'params'),
  checkAuthRoute('Oficinas'),
  async (req, res, next) => {
    try {
      const { id } = req.params;
      const rta = await officeService.delete(id);
      res.json(rta);
    } catch (error) {
      next(error);
    }
  },
);

module.exports = router;
