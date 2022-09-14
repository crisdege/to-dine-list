const sequelize = require("../config/connection");
const seedRestaurants = require("./restaurantsData");
const seedCuisines = require("./cuisineData");
const seedUser = require("./UserData");


const seedAll = async () => {
  await sequelize.sync({ force: true });

  await seedUser();
  seedCuisines();
  seedRestaurants();
        
        


  process.exit(0);
};

seedAll();
