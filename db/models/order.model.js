const { Model, DataTypes, Sequelize } = require('sequelize');
const formatDate = require('../../utils/functions/formatDate');

const ORDER_TABLE = 'orders';
const { USER_TABLE } = require('./user.model');

const OrderSchema = {
  id: {
    allowNull: false,
    // autoIncrement: true,
    primaryKey: true,
    type: DataTypes.INTEGER,
  },
  buyer: {
    type: DataTypes.TEXT,
    allowNull: false,
    defaultValue: '[]',
    get() {
      return JSON.parse(this.getDataValue('buyer'));
    },
    set(value) {
      this.setDataValue('buyer', JSON.stringify(value));
    },
  },
  items: {
    type: DataTypes.TEXT,
    allowNull: false,
    defaultValue: '[]',
    get() {
      return JSON.parse(this.getDataValue('items'));
    },
    set(value) {
      this.setDataValue('items', JSON.stringify(value));
    },
  },
  amount: {
    type: DataTypes.DOUBLE,
    allowNull: false,
  },
  payment: {
    type: DataTypes.BOOLEAN,
    allowNull: false,
  },
  status: {
    allowNull: false,
    type: DataTypes.ENUM(['active', 'finalized']),
  },
  delivery: {
    type: DataTypes.BOOLEAN,
    allowNull: false,
  },
  observation: {
    type: DataTypes.TEXT,
    allowNull: true,
  },
  deliveryInfo: {
    field: 'delivery_info',
    type: DataTypes.TEXT,
    allowNull: true,
    defaultValue: '[]',
    get() {
      return JSON.parse(this.getDataValue('deliveryInfo'));
    },
    set(value) {
      this.setDataValue('deliveryInfo', JSON.stringify(value));
    },
  },
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

class Order extends Model {
  static associate(models) {
    this.belongsTo(models.User, {
      as: 'user',
    });
  }

  static config(sequelize) {
    return {
      sequelize,
      tableName: ORDER_TABLE,
      modelName: 'Order',
      timestamps: false,
    };
  }
}

module.exports = { ORDER_TABLE, OrderSchema, Order };
