const { Model, DataTypes } = require("sequelize");
const sequelize = require("../config/connection");

class Cuisine extends Model {}
//not finished yet
Cuisine.init(
  {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    cuisine_image: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    sequelize,
    freezeTableName: true,
    underscored: true,
    modelName: "cuisine",
  }
);
module.exports = Cuisine;
