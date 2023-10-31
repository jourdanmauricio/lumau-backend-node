const boom = require('@hapi/boom');
const { models } = require('../libs/sequelize');

const { transporter } = require('../config/mailer');

const UserService = require('../services/user.service');
const userService = new UserService();

class OrderService {
  async create(data) {
    const newOrder = await models.Order.create(data);
    const buyer = `
        <p>Nombre: ${newOrder.buyer[0].name}</p>
        <p>Email: ${newOrder.buyer[0].email}</p>
        <p>DNI: ${newOrder.buyer[0].dni}</p>
        <p>Teléfono: ${newOrder.buyer[0].phone}</p>
        <p>Fecha de compra: ${newOrder.createdAt}</p>
        <p>Observación: ${newOrder.observation}</p>`;

    let delivery = '<h2>Datos de envío</h2>';
    delivery += newOrder.delivery
      ? `
      <p>Provincia: ${newOrder.deliveryInfo[0].state}</p>
      <p>Ciudad: ${newOrder.deliveryInfo[0].city}</p>
      <p>Dirección: ${newOrder.deliveryInfo[0].address}</p>`
      : '<p>Pedido sin envío</p>';

    const styles = `
      <style>
        body {
          display: flex;
          justify-content: center;
          align-items: center;
        }
        h2 {
          text-align: left;
        }
        th, td {
          padding: 15px;
          text-align: left;
          border-bottom: 1px solid #ddd;
        }
        tr:nth-child(even) {
          background-color: #f2f2f2;
        }
        th {
          background-color: #f98b24;
          color: white;
        }
      </style>`;

    let html = `<html><head><meta charset="utf-8"><meta name="viewport" content="width=device-width, initial-scale=1.0"><title>Tabla de Datos</title>`;

    html += styles;
    html += `
     </head>
      <body>
        <h2>Pedido nro: ${newOrder.id}</h2>`;
    html += buyer;
    html += `
        <table>
          <thead>
            <tr>
              <th>Producto</th>
              <th>Nombre</th>
              <th>Precio</th>
              <th>Cantidad</th>
              <th>Total</th>
            </tr>
          </thead>
          <tbody>`;

    newOrder.items.forEach((item) => {
      html += `
        <tr>
          <td>${item.id}</td>
          <td>${item.name}</td>
          <td>${item.price}</td>
          <td>${item.quantity}</td>
          <td>${item.quantity * item.price}</td>
        </tr>`;
    });

    html += '</tbody></table>';
    html += delivery;
    html += '</body></html>';

    const mailOptions = {
      from: `Nuevo Pedido 📖 <${data.url}>`,
      to: data.email,
      subject: `Nuevo Pedido ${newOrder.id} ✔`,
      html: html,
      // attachments: [
      //   {
      //     filename: 'archivo_adjunto.txt',
      //     path: 'ruta/al/archivo/adjunto.txt', // Ruta al archivo que deseas adjuntar
      //   },
      // ],
    };

    await transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        console.log(error);
      } else {
        console.log('Correo enviado: ' + info.response);
      }
    });

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
