const { Model, DataTypes } = require('sequelize');

const sequelize = require('../config/connection.js');

class Category extends Model {}

Category.init(
  {
    // define columns
    id: {
      type: DataTypes.INTEGER, // integer
      allowNull: false, 
      primaryKey: true, // set as primary key
      autoIncrement: true // uses auto increment for id's, UUID implimentation would be better irl
    },
    category_name: {
      type: DataTypes.STRING, // string
      allowNull: false 
    }
  },
  {
    sequelize,
    timestamps: false,
    freezeTableName: true,
    underscored: true,
    modelName: 'category',
  }
);

module.exports = Category;
