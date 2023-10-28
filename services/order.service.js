const boom = require('@hapi/boom');
const { models } = require('../libs/sequelize');

const UserService = require('../services/user.service');
const userService = new UserService();

class OrderService {
  async create(data) {
    const newOrder = await models.Order.create(data);
    return newOrder;
  }

  async find(url = '') {
    const user = await userService.findByUrl(url);

    let position = user.dataValues.attributes.search(/Pedidos/);
    if (position === -1) {
      throw boom.unauthorized('web not found');
    }

    const orders = await models.Order.findAll({ where: { userId: user.id } });
    return orders;
  }

  async findOne(id) {
    const order = await models.Order.findByPk(id);
    if (!order) {
      throw boom.notFound('Order not found');
    }
    return order;
  }

  async update(id, changes) {
    const order = await this.findOne(id);
    const rta = await order.update(changes);
    return rta;
  }

  async delete(id) {
    const order = await this.findOne(id);
    await order.destroy();
    return { id };
  }
}

module.exports = OrderService;
