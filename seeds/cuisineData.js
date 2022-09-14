const { Cuisine } = require("../models");

const cuisinedata = [
  {
    name: "asian",
    cuisine_image: "asian_2",
  },
  {
    name: "american",
    cuisine_image: "american_1",
  },
  {
    name: "indian",
    cuisine_image: "indian_1",
  },
  {
    name: "mexican",
    cuisine_image: "mexican_2",
  },
  {
    name: "italian",
    cuisine_image: "italian_2",
  },
  {
    name: "other",
    cuisine_image: "other_1",
  },
];

const seedCuisine = () => Cuisine.bulkCreate(cuisinedata);

module.exports = seedCuisine;
