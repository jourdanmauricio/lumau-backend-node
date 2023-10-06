const boom = require('@hapi/boom');
const { models } = require('../libs/sequelize');

const UserService = require('../services/user.service');
const userService = new UserService();

class PostService {
  async create(data) {
    const newPost = await models.Post.create(data);
    return newPost;
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
