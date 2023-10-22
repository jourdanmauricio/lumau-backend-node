const express = require('express');
const passport = require('passport');

const { checkAuthRoute } = require('./../middlewares/auth.handler');

const validatorHandler = require('../middlewares/validator.handler');
const {
  createProdLibSchema,
  updateProdLibSchema,
  getProdLibSchema,
} = require('../schemas/prodLib.schema');

const router = express.Router();
const ProdLibService = require('../services/prodLib.service');
const prodLibService = new ProdLibService();

router.get('/', async (req, res, next) => {
  try {
    const url = req.headers['url'];

    const products = await prodLibService.find(url);
    res.status(200).json(products);
  } catch (error) {
    next(error);
  }
});

router.post(
  '/',
  passport.authenticate('jwt', { session: false }),
  validatorHandler(createProdLibSchema, 'body'),
  checkAuthRoute('Productos Lib'),
  async (req, res) => {
    const body = req.body;
    const { sub } = req.user;
    body.userId = sub;

    const newProduct = await prodLibService.create(body);
    res.status(201).json(newProduct);
  },
);

router.put(
  '/updateOrCreate',
  passport.authenticate('jwt', { session: false }),
  // validatorHandler(getProdLibSchema, 'params'),
  validatorHandler(updateProdLibSchema, 'body'),
  checkAuthRoute('Productos Lib'),
  async (req, res, next) => {
    try {
      const body = req.body;
      const { sub } = req.user;
      body.userId = sub;
      const product = await prodLibService.updateOrCreate(body);
      res.status(200).json(product);
    } catch (error) {
      next(error);
    }
  },
);

router.put(
  '/:id',
  passport.authenticate('jwt', { session: false }),
  validatorHandler(getProdLibSchema, 'params'),
  validatorHandler(updateProdLibSchema, 'body'),
  checkAuthRoute('Productos Lib'),
  async (req, res, next) => {
    try {
      const { id } = req.params;
      const body = req.body;
      const product = await prodLibService.update(id, body);
      res.status(200).json(product);
    } catch (error) {
      next(error);
    }
  },
);

router.delete(
  '/:id',
  passport.authenticate('jwt', { session: false }),
  validatorHandler(getProdLibSchema, 'params'),
  checkAuthRoute('Productos Lib'),
  async (req, res, next) => {
    try {
      const { id } = req.params;
      const rta = await prodLibService.delete(id);
      res.status(200).json(rta);
    } catch (error) {
      next(error);
    }
  },
);

module.exports = router;
