const { Model, DataTypes, Sequelize } = require('sequelize');
const formatDate = require('../../utils/functions/formatDate');

const NETWORK_TABLE = 'networks';
const { USER_TABLE } = require('./user.model');

const NetworkSchema = {
  id: {
    allowNull: false,
    autoIncrement: true,
    primaryKey: true,
    type: DataTypes.INTEGER,
  },
  facebook: { allowNull: true, type: DataTypes.STRING(255) },
  instagram: { allowNull: true, type: DataTypes.STRING(255) },
  twitter: { allowNull: true, type: DataTypes.STRING(255) },
  whatsapp: { allowNull: true, type: DataTypes.STRING(255) },
  telegram: { allowNull: true, type: DataTypes.STRING(255) },
  youtube: { allowNull: true, type: DataTypes.STRING(255) },
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

class Network extends Model {
  static associate(models) {
    this.belongsTo(models.User, {
      as: 'user',
    });
  }

  static config(sequelize) {
    return {
      sequelize,
      tableName: NETWORK_TABLE,
      modelName: 'Network',
      timestamps: false,
      defaultScope: {
        attributes: { exclude: ['createdAt', 'updatedAt', 'userId'] },
      },
    };
  }
}

module.exports = { NETWORK_TABLE, NetworkSchema, Network };
