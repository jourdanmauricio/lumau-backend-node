const boom = require('@hapi/boom');
const { models } = require('../libs/sequelize');

const UserService = require('../services/user.service');
const userService = new UserService();

class ServiceService {
  async create(data) {
    const newService = await models.Service.create(data);
    return newService;
  }

  async find(url = '') {
    const user = await userService.findByUrl(url);

    let position = user.dataValues.attributes.search(/Servicios/);
    if (position === -1) {
      throw boom.unauthorized('web not found');
    }

    const services = await models.Service.findAll();
    return services;
  }

  async findOne(id) {
    const service = await models.Service.findByPk(id);
    if (!service) {
      throw boom.notFound('Service not found');
    }
    return service;
  }

  async update(id, changes) {
    const service = await this.findOne(id);
    const rta = await service.update(changes);
    return rta;
  }

  async delete(id) {
    const service = await this.findOne(id);
    await service.destroy();
    return { id };
  }
}

module.exports = ServiceService;
