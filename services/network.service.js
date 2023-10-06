const boom = require('@hapi/boom');
const { models } = require('../libs/sequelize');

const UserService = require('../services/user.service');
const userService = new UserService();

class NetworkService {
  async create(data) {
    const newNetwork = await models.Network.create(data);
    return newNetwork;
  }

  async find(url = '') {
    const user = await userService.findByUrl(url);

    let networks = await models.Network.findAll({
      where: { userId: user.id },
    });

    return networks;
  }

  async findOne(id) {
    const network = await models.Network.findByPk(id);
    if (!network) {
      throw boom.notFound('network not found');
    }
    return network;
  }

  async update(id, changes) {
    const network = await this.findOne(id);
    const rta = await network.update(changes);
    return rta;
  }

  async delete(id) {
    const network = await this.findOne(id);
    await network.destroy();
    return { id };
  }
}

module.exports = NetworkService;
