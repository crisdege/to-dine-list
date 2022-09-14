const { Cuisine } = require("../models");

const cuisinedata = [
  {
    name: "asian",
    cuisine_image: "asian_2.jpg",
  },
  {
    name: "american",
    cuisine_image: "american_1.jpg",
  },
  {
    name: "indian",
    cuisine_image: "indian_1.jpg",
  },
  {
    name: "mexican",
    cuisine_image: "mexican_2.jpg",
  },
  {
    name: "italian",
    cuisine_image: "italian_2.jpg",
  },
  {
    name: "other",
    cuisine_image: "other_1.jpg",
  },
];

const seedCuisine = () => Cuisine.bulkCreate(cuisinedata);

module.exports = seedCuisine;
