const boom = require('@hapi/boom');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const nodemailer = require('nodemailer');
const fetch = require('node-fetch');
const axios = require('axios');
const FormData = require('form-data');
const { config } = require('../config/config');

const UserService = require('./user.service');
const userService = new UserService();

class AuthService {
  async getUser(email, password) {
    const user = await userService.findByEmail(email);
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
      attributes: user.attributes,
    };
    const token = jwt.sign(payload, config.jwtSecret);
    return {
      user,
      token,
    };
  }

  async sendRecovery(username) {
    const user = await userService.findByUsername(username);

    if (!user) {
      throw boom.unauthorized();
    }

    const payload = { sub: user.id };
    const token = jwt.sign(payload, config.jwtSecret, {
      expiresIn: '15min',
    });
    const link = `${config.adminFrontEnd}/recovery-password?token=${token}`;
    await userService.update(user.id, {
      recoveryToken: token,
    });

    const mail = {
      from: `${config.emailSend}`,
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
        user: config.emailSend,
        pass: config.emailSendPass,
      },
    });

    await transporter.sendMail(infoMail);
    return { message: 'Mail sent' };
  }

  async changePassword(token, password) {
    try {
      const payload = jwt.verify(token, config.jwtSecret);
      const user = await userService.findOne(payload.sub);

      if (user.recoveryToken !== token) {
        throw boom.unauthorized();
      }

      // const hash = await bcrypt.hash(password, 10);

      await userService.update(user.id, {
        recoveryToken: null,
        password: password,
      });

      return { message: 'Password changed' };
    } catch (error) {
      throw boom.unauthorized();
    }
  }

  async regeneratePage(repo) {
    const data = {
      event_type: 'run-deploy',
    };
    const url = `${config.githubUrl}/${config.adminGithub}/${repo}/dispatches`;
    const options = {
      method: 'POST',
      headers: {
        Accept: 'application/vnd.github.everest-preview+json',
        'Content-Type': 'application/json',
        Authorization: `Bearer ${config.adminGithubToken}`,
      },
      body: JSON.stringify(data),
    };

    const resp = await fetch(url, options);

    if (resp.status !== 204) throw boom.conflict('Error regenerando la página');
    return resp;
  }

  async changeAuthInstagram(userId, body) {
    if (userId !== parseInt(body.state)) {
      throw boom.unauthorized('Unauthorized');
    }
    const url = config.urlChangeTokenFaceDev;
    const data = new FormData();

    // Agrega los campos del formulario desde req.body u otras fuentes
    data.append('client_id', config.clientFaceDev);
    data.append('client_secret', config.secretFaceDev);
    data.append('grant_type', 'authorization_code');
    data.append('redirect_uri', config.redirectUriFaceDev);
    data.append('code', body.code);

    const resp = await axios.post(url, data);

    if (resp.data.access_token) {
      await userService.update(userId, {
        instagramToken: resp.data.access_token,
        instagramUser: resp.data.user_id,
      });
    }

    return { status: 'success', message: resp.data.access_token };
  }
}

module.exports = AuthService;
