const { Restaurant } = require("../models");

const restaurantdata = [
  {
    name: "bu ku",
    cuisine: 6,
    location: "110 East Davie Street, Raleigh",
    rating: 2,
    notes: "Street food from all over the world",
  },
  {
    name: "Bluebird",
    cuisine: 6,
    location: "601 Meadowmont Village Cir, Chapel Hill",
    rating: 3,
    notes: "French bistro",
  },
  {
    name: "Cheeni Indian Food Emporium",
    cuisine: 3,
    location: "1141 Falls River Ave, Raleigh",
    rating: 3,
    notes:
      "Interesting setting. This restaurant is part cafe, part retail shop, part restaurant, sometimes part cooking school",
  },
  {
    name: "Spicy 9 Sushi Bar & Asian Restaurant",
    cuisine: 1,
    location: "140 W Franklin St Ste 150, Chapel Hill",
    rating: 3,
    notes: "Love their Volcano Roll!",
  },
  {
    name: "Pop's Pizzeria",
    cuisine: 5,
    location: "1822 MLK Jr. Blvd, Chapel Hill",
    rating: 2,
    notes: "The Pizza Primavera is decent.",
  },
];

const seedRestaurants = () => Restaurant.bulkCreate(restaurantdata);

module.exports = seedRestaurants;
