const boom = require('@hapi/boom');

const { models } = require('../libs/sequelize');

class SubscriberService {
  constructor() {}

  async create(data) {
    const newSubscriber = await models.Subscriber.create(data);
    return newSubscriber;
  }

  async find() {
    const subscribers = await models.Subscriber.findAll();
    return subscribers;
  }

  async findOne(id) {
    const subscriber = await models.Subscriber.findByPk(id);
    if (!subscriber) {
      throw boom.notFound('subscriber not found');
    }
    return subscriber;
  }

  async update(id, changes) {
    const subscriber = await this.findOne(id);
    const rta = await subscriber.update(changes);
    return rta;
  }

  async delete(id) {
    const subscriber = await this.findOne(id);
    await subscriber.destroy();
    return { id };
  }
}

module.exports = SubscriberService;
