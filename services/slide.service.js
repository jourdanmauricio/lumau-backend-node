const boom = require('@hapi/boom');
const { models } = require('../libs/sequelize');

const UserService = require('./user.service');
const userService = new UserService();

class SlideService {
  async create(data) {
    const newSlide = await models.Slide.create(data);
    return newSlide;
  }

  async find(url = '') {
    const user = await userService.findByUrl(url);

    let position = user.dataValues.attributes.search(/Slides/);
    if (position === -1) {
      throw boom.unauthorized('web not found');
    }

    const slides = await models.Slide.findAll({ where: { userId: user.id } });
    return slides;
  }

  async findOne(id) {
    const slide = await models.Slide.findByPk(id);
    if (!slide) {
      throw boom.notFound('Slide not found');
    }
    return slide;
  }

  async update(id, changes) {
    const slide = await this.findOne(id);
    const rta = await slide.update(changes);
    return rta;
  }

  async delete(id) {
    const slide = await this.findOne(id);
    await slide.destroy();
    return { id };
  }
}

module.exports = SlideService;
