const { Model, DataTypes, Sequelize } = require('sequelize');
const bcrypt = require('bcrypt');
const formatDate = require('../../utils/functions/formatDate');

const USER_TABLE = 'users';

const UserSchema = {
  id: {
    allowNull: false,
    autoIncrement: true,
    primaryKey: true,
    type: DataTypes.INTEGER,
  },
  email: { allowNull: false, type: DataTypes.STRING(255) },
  password: { allowNull: false, type: DataTypes.STRING(50) },
  recoveryToken: {
    field: 'recovery_token',
    allowNull: true,
    type: DataTypes.STRING(250),
  },
  name: { allowNull: false, type: DataTypes.STRING(200) },
  username: { allowNull: false, type: DataTypes.STRING(255), unique: true },
  url: { allowNull: false, type: DataTypes.STRING(255), unique: true },
  phone: { allowNull: true, type: DataTypes.STRING(50) },
  dni: { allowNull: true, type: DataTypes.STRING(50) },
  image: {
    allowNull: true,
    type: DataTypes.STRING(250),
  },
  altImage: {
    field: 'alt_image',
    allowNull: true,
    type: DataTypes.STRING(250),
  },
  deploy: { allowNull: false, type: DataTypes.STRING(50) },
  repo: { allowNull: true, type: DataTypes.STRING(255) },
  cloudName: {
    field: 'cloud_name',
    allowNull: true,
    type: DataTypes.STRING(100),
  },
  cloudFolder: {
    field: 'cloud_folder',
    allowNull: true,
    type: DataTypes.STRING(100),
  },
  cloudApiKey: {
    field: 'cloud_api_key',
    allowNull: true,
    type: DataTypes.STRING(100),
  },
  cloudPreset: {
    field: 'cloud_preset',
    allowNull: true,
    type: DataTypes.STRING(100),
  },
  attributes: {
    type: DataTypes.TEXT,
    allowNull: true,
    defaultValue: '[]',
    get() {
      return JSON.parse(this.getDataValue('attributes'));
    },
    set(value) {
      this.setDataValue('attributes', JSON.stringify(value));
    },
  },
  role: {
    allowNull: false,
    type: DataTypes.ENUM(['admin', 'user']),
    defaultValue: 'user',
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

class User extends Model {
  static associate(models) {
    this.hasMany(models.Subscriber, {
      as: 'subscribers',
      foreignKey: 'userId',
    });
    this.hasMany(models.Contact, {
      as: 'contacts',
      foreignKey: 'userId',
    });
    this.hasMany(models.Note, {
      as: 'notes',
      foreignKey: 'userId',
    });
    this.hasMany(models.Feature, {
      as: 'features',
      foreignKey: 'userId',
    });
    this.hasMany(models.Loan, {
      as: 'loans',
      foreignKey: 'userId',
    });
    this.hasMany(models.Service, {
      as: 'services',
      foreignKey: 'userId',
    });
    this.hasMany(models.Image, {
      as: 'images',
      foreignKey: 'userId',
    });
    this.hasMany(models.Office, {
      as: 'offices',
      foreignKey: 'userId',
    });
    this.hasMany(models.Network, {
      as: 'networks',
      foreignKey: 'userId',
    });
    this.hasMany(models.Post, {
      as: 'posts',
      foreignKey: 'userId',
    });
    this.hasMany(models.Lesson, {
      as: 'lessons',
      foreignKey: 'userId',
    });
    this.hasMany(models.ProdLib, {
      as: 'prodLib',
      foreignKey: 'userId',
    });
    this.hasMany(models.Slide, {
      as: 'slide',
      foreignKey: 'userId',
    });
  }

  static config(sequelize) {
    return {
      sequelize,
      tableName: USER_TABLE,
      modelName: 'User',
      timestamps: false,
      hooks: {
        beforeCreate: async (user) => {
          const password = await bcrypt.hash(user.password, 10);
          user.password = password;
        },
        beforeUpdate: async (user) => {
          if (user.password) {
            const password = await bcrypt.hash(user.password, 10);
            user.password = password;
          }
        },
      },
      defaultScope: {
        attributes: { exclude: ['password'] },
      },
      scopes: {
        withPassword: { attributes: {} },
      },
    };
  }
}
module.exports = { USER_TABLE, UserSchema, User };
