const { Model, DataTypes, Sequelize } = require('sequelize');
const formatDate = require('../../utils/functions/formatDate');

const LOAN_TABLE = 'loans';
const { USER_TABLE } = require('./user.model');

const LoanSchema = {
  id: {
    allowNull: false,
    autoIncrement: true,
    primaryKey: true,
    type: DataTypes.INTEGER,
  },
  type: { allowNull: false, type: DataTypes.STRING(100) },
  maxQuantityQuotes: { allowNull: false, type: DataTypes.INTEGER },
  maxAmount: { allowNull: false, type: DataTypes.DOUBLE },
  rate: { allowNull: false, type: DataTypes.DOUBLE },
  userId: {
    field: 'user_id',
    allowNull: false,
    type: DataTypes.INTEGER,
    references: { model: USER_TABLE, key: 'id' },
    onUpdate: 'CASCADE',
    onDelete: 'CASCADE',
  },
  createdAt: {
    allowNull: false,
    type: DataTypes.DATE,
    field: 'created_at',
    defaultValue: Sequelize.NOW,
    get: function () {
      return formatDate(this.getDataValue('createdAt'));
    },
  },
  updatedAt: {
    allowNull: false,
    type: DataTypes.DATE,
    field: 'updated_at',
    defaultValue: Sequelize.NOW,
    get: function () {
      return formatDate(this.getDataValue('updatedAt'));
    },
  },
};

class Loan extends Model {
  static associate(models) {
    this.belongsTo(models.User, {
      as: 'user',
    });
  }

  static config(sequelize) {
    return {
      sequelize,
      tableName: LOAN_TABLE,
      modelName: 'Loan',
      timestamps: false,
      defaultScope: {
        attributes: { exclude: ['createdAt', 'updatedAt', 'userId'] },
      },
    };
  }
}

module.exports = { LOAN_TABLE, LoanSchema, Loan };
