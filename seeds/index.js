const sequelize = require("../config/connection");
const seedRestaurants = require("./RestaurantsData");
// const seedCuisines = require("./CuisineData");
const seedUser = require("./UserData");

const seedAll = async () => {
  await sequelize.sync({ force: true });

  await seedUser();
  // await seedCuisines();
  await seedRestaurants();

  process.exit(0);
};

seedAll();
