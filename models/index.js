const User = require("./User");
const Restaurant = require("./Restaurant");

User.hasMany(Restaurant, {
  foreignKey: "restaurant_id",
});

module.exports = { User, Restaurant };
