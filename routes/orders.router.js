const express = require('express');
const passport = require('passport');

const { checkAuthRoute } = require('./../middlewares/auth.handler');

const validatorHandler = require('../middlewares/validator.handler');
const {
  createOrderSchema,
  updateOrderSchema,
  getOrderSchema,
} = require('../schemas/order.schema');

const router = express.Router();
const OrderService = require('../services/order.service');
const orderService = new OrderService();

router.get('/', async (req, res, next) => {
  try {
    const url = req.headers['url'];

    const orders = await orderService.find(url);
    res.status(200).json(orders);
  } catch (error) {
    next(error);
  }
});

router.post(
  '/',
  passport.authenticate('jwt', { session: false }),
  validatorHandler(createOrderSchema, 'body'),
  checkAuthRoute('Posts'),
  async (req, res) => {
    const body = req.body;
    const { sub } = req.user;
    body.userId = sub;

    const newOrder = await orderService.create(body);
    res.status(201).json(newOrder);
  },
);

router.put(
  '/:id',
  passport.authenticate('jwt', { session: false }),
  validatorHandler(getOrderSchema, 'params'),
  validatorHandler(updateOrderSchema, 'body'),
  checkAuthRoute('Pedidos'),
  async (req, res, next) => {
    try {
      const { id } = req.params;
      const body = req.body;
      const order = await orderService.update(id, body);
      res.status(200).json(order);
    } catch (error) {
      next(error);
    }
  },
);

router.delete(
  '/:id',
  passport.authenticate('jwt', { session: false }),
  validatorHandler(getOrderSchema, 'params'),
  checkAuthRoute('Pedidos'),
  async (req, res, next) => {
    try {
      const { id } = req.params;
      const rta = await orderService.delete(id);
      res.status(200).json(rta);
    } catch (error) {
      next(error);
    }
  },
);

module.exports = router;
