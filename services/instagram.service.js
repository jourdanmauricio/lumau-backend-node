const boom = require('@hapi/boom');
const { models } = require('../libs/sequelize');
const axios = require('axios');

const UserService = require('./user.service');
const { config } = require('../config/config');
const userService = new UserService();

class InstagramPostService {
  async find(url = '') {
    const user = await userService.findByUrl(url);

    let position = user.dataValues.attributes.search(/Instagram/);
    if (position === -1) {
      throw boom.unauthorized('web not found');
    }

    // // console.log('user', user.instagramToken);
    // const instaUrl = `https://graph.instagram.com/me/media?fields=id,thumbnail_url,media_url,caption,permalink&limit=10&access_token=${user.instagramToken}`;

    // const resp = await axios(instaUrl);
    // console.log('resp', resp.data);

    // return resp.data;
    const posts = await models.Post.findAll({
      where: { userId: user.id, type: 'instagram' },
    });

    return posts;
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
module.exports = InstagramPostService;
