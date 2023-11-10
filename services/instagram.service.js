const boom = require('@hapi/boom');
const { models } = require('../libs/sequelize');
const axios = require('axios');
const FormData = require('form-data');

const UserService = require('./user.service');
const { config } = require('../config/config');
const maxValPropFromArray = require('../utils/functions/maxValPropFromArray');
const userService = new UserService();

class InstagramPostService {
  async find(url = '') {
    const user = await userService.findByUrl(url);

    let position = user.dataValues.attributes.search(/Instagram/);
    if (position === -1) {
      throw boom.unauthorized('web not found');
    }

    const posts = await models.Post.findAll({
      where: { userId: user.id, type: 'instagram' },
    });

    return posts;
  }

  async findOne(id) {
    const post = await models.Post.findByPk(id);
    if (!post) {
      throw boom.notFound('Post not found');
    }
    return post;
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

  async create(userId) {
    const user = await userService.findOne(userId);

    const url = `https://graph.instagram.com/me/media?fields=id,media_type,media_url,permalink,caption,timestamp&access_token=${user.instagramToken}`;

    // Traigo todos los post de instagram
    const resp = await axios(url);

    if (!resp.data.data) throw boom.conflict('no post found');

    // Filtro los nuevos posts
    const instaPosts = resp.data.data;
    const instaPostsDb = await models.Post.findAll({
      where: { userId, type: 'instagram' },
    });

    let maxOrder;

    if (instaPostsDb.length > 0) {
      maxOrder = maxValPropFromArray(instaPostsDb, 'order');
    } else {
      maxOrder = 0;
    }

    const filteredPost = instaPosts.filter(
      (insta) => !instaPostsDb.some((db) => db.title === insta.id),
    );

    const posts = filteredPost.map((post, index) => ({
      title: post.id,
      slug: post.permalink,
      content: post.caption || '',
      image: post.media_url,
      altImage: post.id,
      type: 'instagram',
      sections: ['instagram'],
      order: maxOrder + index + 1,
      userId: userId,
      createdAt: post.timestamp,
    }));

    // Inserto los nuevos posts
    let newPosts = await models.Post.bulkCreate(posts);

    return newPosts;
  }

  async update(id, changes) {
    const post = await this.findOne(id);
    const rta = await post.update(changes);
    return rta;
  }

  async delete(id) {
    const post = await this.findOne(id);
    await post.destroy();
    return { id };
  }
}
module.exports = InstagramPostService;
