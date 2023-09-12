const boom = require('@hapi/boom');
const { models } = require('../libs/sequelize');

const UserService = require('../services/user.service');
const userService = new UserService();

class ImageService {
  async create(data) {
    const newImage = await models.Image.create(data);
    return newImage;
  }

  async find(url = '') {
    const user = await userService.findByUrl(url);

    let position = user.dataValues.attributes.search(/Imágenes/);
    if (position === -1) {
      throw boom.unauthorized('web not found');
    }
    const images = await models.Image.findAll();
    return images;
  }

  async findOne(id) {
    const image = await models.Image.findByPk(id);
    if (!image) {
      throw boom.notFound('loan not found');
    }
    return image;
  }

  async update(id, changes) {
    const image = await this.findOne(id);
    const rta = await image.update(changes);
    return rta;
  }

  async delete(id) {
    const image = await this.findOne(id);
    await image.destroy();
    return { id };
  }
}

module.exports = ImageService;
