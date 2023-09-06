const boom = require('@hapi/boom');

const { models } = require('../libs/sequelize');

class FeatureService {
  constructor() {}

  async create(data) {
    const newFeature = await models.Feature.create(data);
    return newFeature;
  }

  async upsert(data) {
    const feature = await models.Feature.findOne({
      where: { userId: data.userId, name: data.name },
    });
    if (feature) {
      return feature;
    } else {
      const newFeature = this.create(data);
      return newFeature;
    }
  }

  async find() {
    const features = await models.Feature.findAll();
    return features;
  }

  async findByUser(userId) {
    const features = await models.Feature.findAll({ where: { userId } });
    return features;
  }

  async findOne(id) {
    const feature = await models.Feature.findByPk(id);
    if (!feature) {
      throw boom.notFound('note not found');
    }
    return feature;
  }

  async update(id, changes) {
    const feature = await this.findOne(id);
    const rta = await feature.update(changes);
    return rta;
  }

  async delete(id) {
    const feature = await this.findOne(id);
    await feature.destroy();
    return { id };
  }
}

module.exports = FeatureService;
