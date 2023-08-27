const { Model, DataTypes, Sequelize } = require('sequelize');
const { USER_TABLE } = require('./user.model');
const formatDate = require('../../utils/functions/formatDate');
const CONTACT_TABLE = 'contacts';

const ContactSchema = {
  id: {
    allowNull: false,
    autoIncrement: true,
    primaryKey: true,
    type: DataTypes.INTEGER,
  },
  name: { allowNull: true, type: DataTypes.STRING(200) },
  email: { allowNull: false, type: DataTypes.STRING(250) },
  phone: { allowNull: true, type: DataTypes.STRING(50) },
  comment: { allowNull: false, type: DataTypes.STRING(5000) },
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

class Contact extends Model {
  static associate(models) {
    this.belongsTo(models.User, {
      as: 'user',
    });
  }

  static config(sequelize) {
    return {
      sequelize,
      tableName: CONTACT_TABLE,
      modelName: 'Contact',
      timestamps: false,
    };
  }
}
module.exports = { CONTACT_TABLE, ContactSchema, Contact };
