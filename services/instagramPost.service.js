const boom = require('@hapi/boom');
// const { models } = require('../libs/sequelize');

const UserService = require('../services/user.service');
const { default: axios } = require('axios');
const userService = new UserService();

class InstagramPostService {
  async find(url = '') {
    const user = await userService.findByUrl(url);

    // let position = user.dataValues.attributes.search(/InstagramPosts/);
    // if (position === -1) {
    //   throw boom.unauthorized('web not found');
    // }

    if (!user.instagramToken) {
      throw boom.unauthorized('web not found');
    }

    // console.log('user', user.instagramToken);
    const instaUrl = `https://graph.instagram.com/me/media?fields=id,thumbnail_url,media_url,caption,permalink&limit=10&access_token=${user.instagramToken}`;

    const resp = await axios(instaUrl);
    console.log('resp', resp.data);

    return resp.data;
    // const posts = await models.Post.findAll({ where: { userId: user.id } });
    // return posts;
  }
}
module.exports = InstagramPostService;
