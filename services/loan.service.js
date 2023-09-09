const boom = require('@hapi/boom');

const { models } = require('../libs/sequelize');
const UserService = require('../services/user.service');
const userService = new UserService();

class LoanService {
  constructor() {}

  async create(data) {
    const newLoan = await models.Loan.create(data);
    return newLoan;
  }

  async find(url = '') {
    const user = await userService.findByUrl(url);

    let position = user.dataValues.attributes.search(/Préstamos/);

    if (position === -1) {
      throw boom.unauthorized('web not found');
    }
    const loans = await models.Loan.findAll();
    return loans;
  }

  async findOne(id) {
    const loan = await models.Loan.findByPk(id);
    if (!loan) {
      throw boom.notFound('loan not found');
    }
    return loan;
  }

  async update(id, changes) {
    const loan = await this.findOne(id);
    const rta = await loan.update(changes);
    return rta;
  }

  async delete(id) {
    const loan = await this.findOne(id);
    await loan.destroy();
    return { id };
  }
}

module.exports = LoanService;
