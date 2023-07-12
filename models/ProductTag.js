const { Model, DataTypes } = require('sequelize');

const sequelize = require('../config/connection');

class ProductTag extends Model {}

ProductTag.init(
  {
    // define columns
    id: {
      type: DataTypes.INTEGER, // integer
      allowNull: false,
      primaryKey: true, // set as primary key
      autoIncrement: true // uses auto increment for id's, UUID implimentation would be better irl
    },
    product_id: {
      type: DataTypes.INTEGER, // integer
      references: {
        model: 'product', // references the product model
        key: 'id' // uses the id column
      }
    },
    tag_id: {
      type: DataTypes.INTEGER, // integer
      references: {
        model: 'tag', // references the tag model
        key: 'id' // uses the id column
      }
    }
  },
  {
    sequelize,
    timestamps: false,
    freezeTableName: true,
    underscored: true,
    modelName: 'product_tag',
  }
);

module.exports = ProductTag;
