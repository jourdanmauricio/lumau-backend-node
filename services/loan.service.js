const boom = require('@hapi/boom');

const { models } = require('../libs/sequelize');

class LoanService {
  constructor() {}

  async create(data) {
    const newLoan = await models.Loan.create(data);
    return newLoan;
  }

  async find() {
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
