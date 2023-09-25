const boom = require('@hapi/boom');
const { config } = require('../config/config');
const { transporter } = require('../config/mailer');

const { models } = require('../libs/sequelize');

class SubscriberService {
  constructor() {}

  async create(data) {
    const newSubscriber = await models.Subscriber.create(data);

    // Send email
    await transporter.sendMail({
      from: `"Formulario de suscripción 👻" <${config.emailSend}>`,
      to: data.emailTo,
      subject: `Nuevo Suscriptor en ${data.url} ✔`,
      html: `
      <h2 style='text-align: center;'>Tienes un nuevo suscriptor!</h2>
      <p>Nombre: ${newSubscriber.name}</p>
      <p>Email: ${newSubscriber.email}</p>
      `,
    });

    return newSubscriber;
  }

  async find(userId) {
    const subscribers = await models.Subscriber.findAll({
      where: { userId },
    });
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
