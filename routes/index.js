const express = require('express');

const usersRouter = require('./users.router');
const contactsRouter = require('./contacts.router');
const subscribersRouter = require('./subscribers.router');
const authRouter = require('./auth.router');
const notesRouter = require('./notes.router');
const featuresRouter = require('./features.router');
const loansRouter = require('./loans.router');
const servicesRouter = require('./services.router');
const imagesRouter = require('./images.router');

function routerApi(app) {
  const router = express.Router();
  app.use('/v1', router);
  router.use('/auth', authRouter);
  router.use('/users', usersRouter);
  router.use('/contacts', contactsRouter);
  router.use('/subscribers', subscribersRouter);
  router.use('/notes', notesRouter);
  router.use('/features', featuresRouter);
  router.use('/loans', loansRouter);
  router.use('/services', servicesRouter);
  router.use('/images', imagesRouter);
}
module.exports = routerApi;
