const boom = require('@hapi/boom');
const { models } = require('../libs/sequelize');

const UserService = require('../services/user.service');
const userService = new UserService();

class LessonService {
  async create(data) {
    const newLesson = await models.Lesson.create(data);
    return newLesson;
  }

  async find(url = '') {
    const user = await userService.findByUrl(url);

    let position = user.dataValues.attributes.search(/Clases/);
    if (position === -1) {
      throw boom.unauthorized('web not found');
    }

    const lessons = await models.Lesson.findAll({ where: { userId: user.id } });
    return lessons;
  }

  async findOne(id) {
    const lesson = await models.Lesson.findByPk(id);
    if (!lesson) {
      throw boom.notFound('Post not found');
    }
    return lesson;
  }

  async update(id, changes) {
    const lesson = await this.findOne(id);
    const rta = await lesson.update(changes);
    return rta;
  }

  async delete(id) {
    const lesson = await this.findOne(id);
    await lesson.destroy();
    return { id };
  }
}

module.exports = LessonService;
