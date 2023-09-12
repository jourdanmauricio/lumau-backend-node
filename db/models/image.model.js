const { Model, DataTypes, Sequelize } = require('sequelize');
const formatDate = require('../../utils/functions/formatDate');

const IMAGE_TABLE = 'images';
const { USER_TABLE } = require('./user.model');

const ImageSchema = {
  id: {
    allowNull: false,
    autoIncrement: true,
    primaryKey: true,
    type: DataTypes.INTEGER,
  },
  assetId: { field: 'asset_id', allowNull: false, type: DataTypes.STRING(100) },
  bytes: { allowNull: false, type: DataTypes.INTEGER },
  etag: { allowNull: false, type: DataTypes.STRING(100) },
  folder: { allowNull: false, type: DataTypes.STRING(100) },
  format: { allowNull: false, type: DataTypes.STRING(10) },
  height: { allowNull: false, type: DataTypes.INTEGER },
  width: { allowNull: false, type: DataTypes.INTEGER },
  originalFilename: {
    field: 'original_filename',
    allowNull: false,
    type: DataTypes.STRING(255),
  },
  publicId: {
    field: 'public_id',
    allowNull: false,
    type: DataTypes.STRING(100),
  },
  resourceType: {
    field: 'resource_type',
    allowNull: false,
    type: DataTypes.STRING(50),
  },
  secureUrl: {
    field: 'secure_url',
    allowNull: false,
    type: DataTypes.STRING(255),
  },
  signature: { allowNull: false, type: DataTypes.STRING(255) },
  type: { allowNull: false, type: DataTypes.STRING(50) },
  url: { allowNull: false, type: DataTypes.STRING(255) },

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

class Image extends Model {
  static associate(models) {
    this.belongsTo(models.User, {
      as: 'user',
    });
  }

  static config(sequelize) {
    return {
      sequelize,
      tableName: IMAGE_TABLE,
      modelName: 'Image',
      timestamps: false,
    };
  }
}

module.exports = { IMAGE_TABLE, ImageSchema, Image };
