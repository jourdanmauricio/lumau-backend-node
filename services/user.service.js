// const bcrypt = require('bcrypt');
const boom = require('@hapi/boom');

const { models } = require('../libs/sequelize');
// const sequelize = require('../libs/sequelize');

class UserService {
  constructor() {}

  async create(data) {
    // const hash = await bcrypt.hash(data.password, 10);
    // const newUser = await models.User.create({ ...data, password: hash });
    // delete newUser.dataValues.password;
    const newUser = await models.User.create(data);
    delete newUser.dataValues.password;
    return newUser;
  }

  async find() {
    // const query = 'SELECT * FROM task';
    // const [data] = await sequelize.query(query);
    // return data;
    const users = await models.User.findAll();
    return users;
  }

  async findByUrl(url) {
    const user = await models.User.scope('withPassword').findOne({
      where: { url },
    });
    if (!user) {
      throw boom.notFound('web not found');
    }
    return user;
  }

  async findByUsername(username) {
    const user = await models.User.scope('withPassword').findOne({
      where: { username },
    });
    if (!user) {
      throw boom.notFound('user not found');
    }
    return user;
  }
  async findAuthor(url = '') {
    const user = await models.User.findOne({
      attributes: ['id', 'name', 'image', 'altImage'],
      where: { url },
    });
    if (!user) {
      throw boom.notFound('web not found');
    }
    return user;
  }

  async findOne(id) {
    const user = await models.User.findByPk(id);
    if (!user) {
      throw boom.notFound('user not found');
    }
    return user;
  }

  async update(id, changes) {
    // console.log('update user', id);
    const user = await this.findOne(id);
    const rta = await user.update(changes);
    return rta;
  }

  async delete(id) {
    const user = await this.findOne(id);
    if (user.role === 'admin') {
      throw boom.unauthorized(`Can't delete admin user`);
    }

    await user.destroy();
    return { id };
  }
}

module.exports = UserService;
