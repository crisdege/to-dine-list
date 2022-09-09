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
  },
  {
    sequelize,
    freezeTableName: true,
    underscored: true,
    modelName: "cuisine",
  }
);
