const boom = require('@hapi/boom');
const { config } = require('../config/config');
const { transporter } = require('../config/mailer');

const { models } = require('../libs/sequelize');

class ContactService {
  constructor() {}

  async create(data) {
    const newContact = await models.Contact.create(data);

    // Send email
    await transporter.sendMail({
      from: `"Formulario de Contacto 👻" <${config.emailSend}>`,
      // to: config.emailTo,
      to: data.email,
      subject: `Nuevo Mesanje de contacto recibido en ${data.url} ✔`,
      html: `
        <h2 style='text-align: center;'>Tienes un nuevo mensaje de contacto!</h2>
        <div style='border: 1px solid #5a5959; padding: 10px; border-radius: 0.25rem; display: inline-block; max-width: 80%; margin: 0 auto; display: flex; justify-content:center;'>
          <div style='display: grid; grid-template-columns: 100px 1 fr;'>
            <p>Nombre: ${newContact.name}</p>
            <hr>
            <p>Teléfono: ${newContact.phone}</p>
            <p>Email: ${newContact.email}</p>
            <p>Comentario: ${newContact.comment}</p>
          </div>
        </div>
        `,
    });

    return newContact;
  }

  async find(userId) {
    const contacts = await models.Contact.findAll({
      where: { userId },
    });
    return contacts;
  }

  async findOne(id, userId) {
    const contact = await models.Contact.findByPk(id, {
      where: { userId },
    });
    if (!contact) {
      throw boom.notFound('contact not found');
    }
    return contact;
  }

  async update(id, changes, userId) {
    const contact = await this.findOne(id, userId);
    const rta = await contact.update(changes);
    return rta;
  }

  async delete(id, userId) {
    const contact = await this.findOne(id, userId);
    await contact.destroy();
    return { id };
  }
}

module.exports = ContactService;
