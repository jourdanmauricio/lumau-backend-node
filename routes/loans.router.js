const express = require('express');
const passport = require('passport');

const validatorHandler = require('../middlewares/validator.handler');
const { checkAuthRoute } = require('./../middlewares/auth.handler');
const {
  createLoanSchema,
  updateLoanSchema,
  getLoanSchema,
} = require('../schemas/loan.schema');

const LoanService = require('../services/loan.service');
const loanService = new LoanService();

const router = express.Router();

router.get('/', async (req, res, next) => {
  try {
    const url = req.headers['url'];

    const loans = await loanService.find(url);
    res.json(loans);
  } catch (error) {
    next(error);
  }
});

router.get(
  '/:id',
  validatorHandler(getLoanSchema, 'params'),
  async (req, res, next) => {
    try {
      const { id } = req.params;
      const loan = await loanService.findOne(id);
      res.json(loan);
    } catch (error) {
      next(error);
    }
  },
);

router.post(
  '/',
  passport.authenticate('jwt', { session: false }),
  validatorHandler(createLoanSchema, 'body'),
  checkAuthRoute('Préstamos'),
  async (req, res, next) => {
    try {
      const body = req.body;
      const { sub } = req.user;
      body.userId = sub;

      const loan = await loanService.create(body);
      res.status(201).json(loan);
    } catch (error) {
      next(error);
    }
  },
);

router.put(
  '/:id',
  passport.authenticate('jwt', { session: false }),
  validatorHandler(getLoanSchema, 'params'),
  validatorHandler(updateLoanSchema, 'body'),
  checkAuthRoute('Préstamos'),
  async (req, res, next) => {
    try {
      const { id } = req.params;
      const body = req.body;
      const loan = await loanService.update(id, body);
      res.json(loan);
    } catch (error) {
      next(error);
    }
  },
);

router.delete(
  '/:id',
  passport.authenticate('jwt', { session: false }),
  validatorHandler(getLoanSchema, 'params'),
  checkAuthRoute('Préstamos'),
  async (req, res) => {
    const { id } = req.params;
    const rta = await loanService.delete(id);
    res.json(rta);
  },
);

module.exports = router;
