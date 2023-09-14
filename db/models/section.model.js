const { Model, DataTypes, Sequelize } = require('sequelize');
const formatDate = require('../../utils/functions/formatDate');

const SECTION_TABLE = 'sections';

const SectionSchema = {
  id: {
    allowNull: false,
    autoIncrement: true,
    primaryKey: true,
    type: DataTypes.INTEGER,
  },
  name: { allowNull: false, type: DataTypes.STRING(20) },
  resource: { allowNull: false, type: DataTypes.STRING(20) },
  route: { allowNull: true, type: DataTypes.STRING(30) },
  icon: { allowNull: true, type: DataTypes.STRING(20) },
  description: { allowNull: true, type: DataTypes.STRING(100) },
  roles: {
    type: DataTypes.TEXT,
    allowNull: true,
    defaultValue: '[]',
    get() {
      return JSON.parse(this.getDataValue('roles'));
    },
    set(value) {
      this.setDataValue('roles', JSON.stringify(value));
    },
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

class Section extends Model {
  static associate(models) {
    this.belongsTo(models.User, {
      as: 'user',
    });
  }

  static config(sequelize) {
    return {
      sequelize,
      tableName: SECTION_TABLE,
      modelName: 'Section',
      timestamps: false,
    };
  }
}

module.exports = { SECTION_TABLE, SectionSchema, Section };
