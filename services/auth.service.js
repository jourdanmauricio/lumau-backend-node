const boom = require('@hapi/boom');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const nodemailer = require('nodemailer');

const { config } = require('../config/config');

const UserService = require('./user.service');
const service = new UserService();

class AuthService {
  async getUser(email, password) {
    const user = await service.findByEmail(email);
    if (!user) {
      throw boom.unauthorized();
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      throw boom.unauthorized();
    }
    delete user.dataValues.password;
    delete user.dataValues.recovery_token;
    return user;
  }

  signToken(user) {
    const payload = {
      sub: user.id,
      role: user.role,
    };
    const token = jwt.sign(payload, config.jwtSecret);
    return {
      user,
      token,
    };
  }

  async sendRecovery(email) {
    const user = await service.findByEmail(email);
    if (!user) {
      throw boom.unauthorized();
    }

    const payload = { sub: user.id };
    const token = jwt.sign(payload, config.jwtSecret, {
      expiresIn: '15min',
    });
    const link = `${config.adminFrontEnd}/recovery-password?token=${token}`;
    await service.update(user.id, { recovery_token: token });

    const mail = {
      from: `"Foo Boo 👻" <${config.mailerEmail}>`,
      to: `${user.email}`,
      subject: 'Email para recuperar contraseña 👌',
      html: `
      <p>Has solicitado recuperar el password. Si no fuiste tú ignora este email.</p>
      <table width="100%" cellspacing="0" cellpadding="0">
        <tr>
          <td>
            <table cellspacing="0" cellpadding="0">
              <tr>
                <td style="border-radius: 2px;" bgcolor="#ED2939">
                  <a href=${link} target="_blank" style="padding: 8px 12px; border: 1px solid #ED2939;border-radius: 2px;font-family: Helvetica, Arial, sans-serif;font-size: 14px; color: #ffffff;text-decoration: none;font-weight:bold;display: inline-block;">
                    Recuperar contraseña
                  </a>
                </td>
              </tr>
            </table>
          </td>
        </tr>
      </table>
      <p>Si el botón no fuciona puedes copiar y pegar el siguiente ingresa a este link
      en tu navegador para recuperar tu contraseña:</p>
      <br> ${link} <br><br>
      <p>Muchas gracias,</p>
      <p>TiDev</p>
      `,
    };

    const rta = await this.sendMail(mail);
    return rta;
  }

  async sendMail(infoMail) {
    const transporter = nodemailer.createTransport({
      host: 'smtp.gmail.com',
      secure: true, // true for 465, false for other ports
      port: 465,
      auth: {
        user: config.mailerEmail,
        pass: config.mailerPassword,
      },
    });

    await transporter.sendMail(infoMail);
    return { message: 'Mail sent' };
  }

  async changePassword(token, password) {
    try {
      const payload = jwt.verify(token, config.jwtSecret);
      const user = await service.findOne(payload.sub);

      if (user.recovery_token !== token) {
        throw boom.unauthorized();
      }

      const hash = await bcrypt.hash(password, 10);

      await service.update(user.id, {
        recovery_token: null,
        password: hash,
      });

      return { message: 'Password changed' };
    } catch (error) {
      throw boom.unauthorized();
    }
  }
}

module.exports = AuthService;
