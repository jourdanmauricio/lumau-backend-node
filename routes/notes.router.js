const express = require('express');
const passport = require('passport');

const validatorHandler = require('../middlewares/validator.handler');
const {
  createNoteSchema,
  updateNoteSchema,
  getNoteSchema,
} = require('../schemas/note.schema');
const NoteService = require('../services/note.service');
const noteService = new NoteService();
// const UserService = require('../services/user.service');
// const userService = new UserService();

const router = express.Router();

router.get(
  '/',
  passport.authenticate('jwt', { session: false }),
  async (req, res) => {
    const url = req.headers['url'];
    const notes = await noteService.find(url);
    res.json(notes);
  },
);

router.get(
  '/:id',
  passport.authenticate('jwt', { session: false }),
  validatorHandler(getNoteSchema, 'params'),
  async (req, res, next) => {
    try {
      const { id } = req.params;
      const note = await noteService.findOne(id);
      res.json(note);
    } catch (error) {
      next(error);
    }
  },
);

router.post(
  '/',
  passport.authenticate('jwt', { session: false }),
  validatorHandler(createNoteSchema, 'body'),
  async (req, res) => {
    const body = req.body;
    const { sub } = req.user;
    body.userId = sub;

    const note = await noteService.create(body);
    res.status(201).json(note);
  },
);

router.put(
  '/:id',
  passport.authenticate('jwt', { session: false }),
  validatorHandler(getNoteSchema, 'params'),
  validatorHandler(updateNoteSchema, 'body'),
  async (req, res, next) => {
    try {
      const { id } = req.params;
      const body = req.body;
      const note = await noteService.update(id, body);
      res.json(note);
    } catch (error) {
      next(error);
    }
  },
);

router.delete(
  '/:id',
  passport.authenticate('jwt', { session: false }),
  validatorHandler(getNoteSchema, 'params'),
  // validatorHandler(updateSubscriberSchema, 'body'),
  async (req, res) => {
    const { id } = req.params;
    const rta = await noteService.delete(id);
    res.json(rta);
  },
);

module.exports = router;
