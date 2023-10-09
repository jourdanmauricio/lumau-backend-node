const boom = require('@hapi/boom');

const { models } = require('../libs/sequelize');
const UserService = require('../services/user.service');
const userService = new UserService();

class NoteService {
  constructor() {}

  async create(data) {
    const newNote = await models.Note.create(data);
    return newNote;
  }

  async find(url) {
    const user = await userService.findByUrl(url);

    if (!user) {
      throw boom.unauthorized('web not found');
    }

    const notes = await models.Note.findAll({ where: { userId: user.id } });
    return notes;
  }

  async findOne(id) {
    const note = await models.Note.findByPk(id);
    if (!note) {
      throw boom.notFound('note not found');
    }
    return note;
  }

  async update(id, changes) {
    const note = await this.findOne(id);
    const rta = await note.update(changes);
    return rta;
  }

  async delete(id) {
    const note = await this.findOne(id);
    await note.destroy();
    return { id };
  }
}

module.exports = NoteService;
