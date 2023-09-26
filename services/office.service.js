const boom = require('@hapi/boom');
const { models } = require('../libs/sequelize');

const UserService = require('../services/user.service');
const userService = new UserService();

class OfficeService {
  async create(data) {
    const newOffice = await models.Office.create(data);
    return newOffice;
  }

  async find(url = '') {
    const user = await userService.findByUrl(url);

    let position = user.dataValues.attributes.search(/Oficinas/);
    if (position === -1) {
      throw boom.unauthorized('web not found');
    }
    const offices = await models.Office.findAll({
      where: { userId: user.id },
    });
    return offices;
  }

  async findOne(id) {
    const office = await models.Office.findByPk(id);
    if (!office) {
      throw boom.notFound('office not found');
    }
    return office;
  }

  async update(id, changes) {
    const office = await this.findOne(id);
    const rta = await office.update(changes);
    return rta;
  }

  async delete(id) {
    const office = await this.findOne(id);
    await office.destroy();
    return { id };
  }
}

module.exports = OfficeService;
