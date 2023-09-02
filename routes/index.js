const express = require('express');

const usersRouter = require('./users.router');
const contactsRouter = require('./contacts.router');
const subscribersRouter = require('./subscribers.router');
const authRouter = require('./auth.router');
const notesRouter = require('./notes.router');

function routerApi(app) {
  const router = express.Router();
  app.use('/v1', router);
  router.use('/auth', authRouter);
  router.use('/users', usersRouter);
  router.use('/contacts', contactsRouter);
  router.use('/subscribers', subscribersRouter);
  router.use('/notes', notesRouter);
}
module.exports = routerApi;
