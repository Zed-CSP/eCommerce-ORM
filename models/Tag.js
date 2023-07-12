const { Model, DataTypes } = require('sequelize');

const sequelize = require('../config/connection.js');

class Tag extends Model {}

Tag.init(
  {
    // define columns
    id: {
      type: DataTypes.INTEGER, // integer
      allowNull: false,
      primaryKey: true, // set as primary key
      autoIncrement: true // uses auto increment for id's, UUID implimentation would be better irl
    },
    tag_name: {
      type: DataTypes.STRING // string
    }
  },
  {
    sequelize,
    timestamps: false,
    freezeTableName: true,
    underscored: true,
    modelName: 'tag',
  }
);

module.exports = Tag;
