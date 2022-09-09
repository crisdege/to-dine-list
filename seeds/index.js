const sequelize = require("../config/connection");
const seedRestaurants = require("./restaurantsData");

const seedAll = async () => {
  await sequelize.sync({ force: true });

  await seedRestaurants();

  process.exit(0);
};

seedAll();
