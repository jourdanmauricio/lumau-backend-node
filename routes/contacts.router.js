const express = require('express');
const passport = require('passport');

const validatorHandler = require('./../middlewares/validator.handler');
const {
  createContactSchema,
  updateContactSchema,
  getContactSchema,
} = require('./../schemas/contact.schema');
const ContactService = require('../services/contact.service');
const contactService = new ContactService();
const UserService = require('../services/user.service');
const userService = new UserService();

const router = express.Router();

router.get(
  '/',
  passport.authenticate('jwt', { session: false }),
  async (req, res) => {
    const user = req.user;
    const contacts = await contactService.find(user.sub);
    res.json(contacts);
  },
);

router.get(
  '/:id',
  passport.authenticate('jwt', { session: false }),
  validatorHandler(getContactSchema, 'params'),
  async (req, res, next) => {
    try {
      const user = req.user;
      const { id } = req.params;
      const subscriber = await contactService.findOne(id, user.sub);
      res.json(subscriber);
    } catch (error) {
      next(error);
    }
  },
);

router.post(
  '/',
  validatorHandler(createContactSchema, 'body'),
  async (req, res) => {
    const body = req.body;
    const { url } = req.body;
    const user = await userService.findByUrl(url);
    body.userId = user.id;
    body.email = user.email;
    const newContact = await contactService.create(body);
    res.status(201).json(newContact);
  },
);

router.put(
  '/:id',
  passport.authenticate('jwt', { session: false }),
  validatorHandler(getContactSchema, 'params'),
  validatorHandler(updateContactSchema, 'body'),
  async (req, res, next) => {
    try {
      const user = req.user;
      const { id } = req.params;
      const body = req.body;
      const contact = await contactService.update(id, body, user.sub);
      res.json(contact);
    } catch (error) {
      next(error);
    }
  },
);

router.delete(
  '/:id',
  passport.authenticate('jwt', { session: false }),
  validatorHandler(getContactSchema, 'params'),
  async (req, res) => {
    const user = req.user;
    const { id } = req.params;
    const rta = await contactService.delete(id, user.sub);
    res.json(rta);
  },
);

module.exports = router;
