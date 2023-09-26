const { Model, DataTypes, Sequelize } = require('sequelize');
const formatDate = require('../../utils/functions/formatDate');

const OFFICE_TABLE = 'offices';
const { USER_TABLE } = require('./user.model');

const OfficeSchema = {
  id: {
    allowNull: false,
    autoIncrement: true,
    primaryKey: true,
    type: DataTypes.INTEGER,
  },
  city: { allowNull: false, type: DataTypes.STRING(100) },
  cp: { allowNull: false, type: DataTypes.STRING(10) },
  address: { allowNull: false, type: DataTypes.STRING(150) },
  province: { allowNull: false, type: DataTypes.STRING(50) },
  lat: { allowNull: true, type: DataTypes.STRING(50) },
  lng: { allowNull: true, type: DataTypes.STRING(50) },
  phone: { allowNull: true, type: DataTypes.STRING(50) },
  email: { allowNull: true, type: DataTypes.STRING(255) },
  order: { allowNull: true, type: DataTypes.INTEGER },
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

class Office extends Model {
  static associate(models) {
    this.belongsTo(models.User, {
      as: 'user',
    });
  }

  static config(sequelize) {
    return {
      sequelize,
      tableName: OFFICE_TABLE,
      modelName: 'Office',
      timestamps: false,
      defaultScope: {
        attributes: { exclude: ['createdAt', 'updatedAt', 'userId'] },
      },
    };
  }
}

module.exports = { OFFICE_TABLE, OfficeSchema, Office };
