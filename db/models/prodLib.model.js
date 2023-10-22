const { Model, DataTypes, Sequelize } = require('sequelize');
const formatDate = require('../../utils/functions/formatDate');

const PROD_LIB_TABLE = 'prod_lib';
const { USER_TABLE } = require('./user.model');

const ProdLibSchema = {
  id: {
    allowNull: false,
    primaryKey: true,
    type: DataTypes.STRING,
  },
  name: {
    allowNull: false,
    type: DataTypes.STRING,
  },
  category: {
    allowNull: false,
    type: DataTypes.STRING,
  },
  categoryWeb: {
    field: 'category_web',
    allowNull: true,
    type: DataTypes.STRING,
  },
  status: {
    allowNull: false,
    type: DataTypes.ENUM(['active', 'paused']),
  },
  costPrice: {
    field: 'cost_price',
    allowNull: true,
    type: DataTypes.DOUBLE,
  },
  iva: { allowNull: true, type: DataTypes.INTEGER },
  price: {
    field: 'reatil_price',
    allowNull: false,
    type: DataTypes.DOUBLE,
  },
  wholesalePrice: {
    field: 'wholesale_price',
    allowNull: true,
    type: DataTypes.DOUBLE,
  },
  maxPrice: {
    field: 'max_price',
    allowNull: true,
    type: DataTypes.DOUBLE,
  },
  supplier: {
    allowNull: true,
    type: DataTypes.STRING,
  },
  other: {
    allowNull: true,
    type: DataTypes.STRING,
  },
  slug: {
    allowNull: true,
    type: DataTypes.STRING,
  },
  excerpt: {
    allowNull: true,
    type: DataTypes.STRING,
  },
  content: {
    allowNull: true,
    type: DataTypes.TEXT,
  },
  image: {
    allowNull: true,
    type: DataTypes.STRING,
  },
  altImage: {
    field: 'alt_image',
    allowNull: true,
    type: DataTypes.STRING,
  },
  type: {
    allowNull: true,
    type: DataTypes.STRING,
  },
  sections: {
    type: DataTypes.TEXT,
    allowNull: true,
    defaultValue: '[]',
    get() {
      return JSON.parse(this.getDataValue('sections'));
    },
    set(value) {
      this.setDataValue('sections', JSON.stringify(value));
    },
  },
  order: {
    allowNull: true,
    type: DataTypes.INTEGER,
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

class ProdLib extends Model {
  static associate(models) {
    this.belongsTo(models.User, {
      as: 'user',
    });
  }

  static config(sequelize) {
    return {
      sequelize,
      tableName: PROD_LIB_TABLE,
      modelName: 'ProdLib',
      timestamps: false,
    };
  }
}

module.exports = { PROD_LIB_TABLE, ProdLibSchema, ProdLib };
