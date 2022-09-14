const User = require("./User");
const Restaurant = require("./Restaurant");
const Cuisine = require("./Cuisine");

User.hasMany(Restaurant, {
  foreignKey: "restaurant_id",
});

Cuisine.hasMany(Restaurant, {
  foreignKey: "restaurant_id",
});

module.exports = { User, Restaurant, Cuisine };
