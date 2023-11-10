const boom = require('@hapi/boom');
const { models } = require('../libs/sequelize');
const axios = require('axios');

const UserService = require('../services/user.service');
const maxValPropFromArray = require('../utils/functions/maxValPropFromArray');
const userService = new UserService();

class PostService {
  async create(data) {
    const newPost = await models.Post.create(data);
    return newPost;
  }

  async importInstagram(userId) {
    const user = await userService.findOne(userId);

    if (!user) throw boom.conflict('web not found');

    const url = `https://graph.instagram.com/me/media?fields=id,media_type,media_url,permalink,caption,timestamp&access_token=${user.instagramToken}`;

    try {
      // Traigo todos los post de instagram
      const resp = await axios(url);
      if (!resp.data.data) throw boom.conflict('post not found');

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
    } catch (error) {
      throw boom.internal(error.response.data);
    }
  }

  async find(url = '') {
    const user = await userService.findByUrl(url);

    let position = user.dataValues.attributes.search(/Posts/);
    if (position === -1) {
      throw boom.unauthorized('web not found');
    }

    const posts = await models.Post.findAll({ where: { userId: user.id } });
    return posts;
  }

  async findOne(id) {
    const post = await models.Post.findByPk(id);
    if (!post) {
      throw boom.notFound('Post not found');
    }
    return post;
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

module.exports = PostService;
