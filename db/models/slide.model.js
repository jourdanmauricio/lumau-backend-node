const { Model, DataTypes, Sequelize } = require('sequelize');
const formatDate = require('../../utils/functions/formatDate');

const SLIDE_TABLE = 'slide';
const { USER_TABLE } = require('./user.model');

const SlideSchema = {
  id: {
    allowNull: false,
    autoIncrement: true,
    primaryKey: true,
    type: DataTypes.INTEGER,
  },
  title: {
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
    type: DataTypes.STRING,
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

class Slide extends Model {
  static associate(models) {
    this.belongsTo(models.User, {
      as: 'user',
    });
  }

  static config(sequelize) {
    return {
      sequelize,
      tableName: SLIDE_TABLE,
      modelName: 'Slide',
      timestamps: false,
    };
  }
}

module.exports = { SLIDE_TABLE, SlideSchema, Slide };
