const boom = require('@hapi/boom');

const { models } = require('../libs/sequelize');

class SectionService {
  constructor() {}

  async create(data) {
    const newSection = await models.Section.create(data);
    return newSection;
  }

  async find() {
    const sections = await models.Section.findAll();
    return sections;
  }

  async findOne(id) {
    const section = await models.Section.findByPk(id);
    if (!section) {
      throw boom.notFound('section not found');
    }
    return section;
  }

  async update(id, changes) {
    const section = await this.findOne(id);
    const rta = await section.update(changes);
    return rta;
  }

  async delete(id) {
    const section = await this.findOne(id);
    await section.destroy();
    return { id };
  }
}

module.exports = SectionService;
