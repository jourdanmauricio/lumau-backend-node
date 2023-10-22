const boom = require('@hapi/boom');
const { models } = require('../libs/sequelize');

const UserService = require('../services/user.service');
const userService = new UserService();

class ProdLibService {
  async create(data) {
    const newProduct = await models.ProdLib.create(data);
    return newProduct;
  }

  async find(url = '') {
    const user = await userService.findByUrl(url);

    let position = user.dataValues.attributes.search(/Productos Lib/);
    if (position === -1) {
      throw boom.unauthorized('web not found');
    }

    const products = await models.ProdLib.findAll({
      where: { userId: user.id },
    });
    return products;
  }

  async findOne(articulo) {
    const product = await models.ProdLib.findByPk(articulo);
    if (!product) {
      throw boom.notFound('Post not found');
    }
    return product;
  }

  async updateOrCreate(data) {
    const product = await models.ProdLib.findByPk(data.id);

    let rta;
    if (product) {
      delete data.article;
      rta = await product.update(data);
    } else {
      rta = await this.create(data);
    }
    return rta;
  }

  async update(articulo, changes) {
    const product = await this.findOne(articulo);
    const rta = await product.update(changes);
    return rta;
  }

  async delete(id) {
    const product = await this.findOne(id);
    await product.destroy();
    return { id };
  }
}

module.exports = ProdLibService;
