const User = require("./User");
const Restaurant = require("./Restaurant");
const Cuisine = require("./Cuisine");

User.hasMany(Restaurant, {
  foreignKey: "user_id"
});

Restaurant.belongsTo(User, {
  foreignKey: 'user_id'
});

Cuisine.hasMany(Restaurant, {
  foreignKey: "cuisine_id"
});

Restaurant.belongsTo(Cuisine, {
  foreignKey: "cuisine_id"
});

module.exports = { User, Restaurant, Cuisine };
