const { Restaurant } = require("../models");

const restaurantdata = [
  {
    name: "bu ku",
    cuisine_id: 6,
    location: "110 East Davie Street, Raleigh",
    rating: 2,
    notes: "Street food from all over the world",
    user_id: 1
  },
  {
    name: "Bluebird",
    cuisine_id: 6,
    location: "601 Meadowmont Village Cir, Chapel Hill",
    rating: 3,
    notes: "French bistro",
    user_id: 1
  },
  {
    name: "Cheeni Indian Food Emporium",
    cuisine_id: 3,
    location: "1141 Falls River Ave, Raleigh",
    rating: 3,
    notes:
      "Interesting setting. This restaurant is part cafe, part retail shop, part restaurant, sometimes part cooking school",
    user_id: 1
  },
  {
    name: "Spicy 9 Sushi Bar & Asian Restaurant",
    cuisine_id: 1,
    location: "140 W Franklin St Ste 150, Chapel Hill",
    rating: 3,
    notes: "Love their Volcano Roll!",
    user_id: 1
  },
  {
    name: "Pop's Pizzeria",
    cuisine_id: 5,
    location: "1822 MLK Jr. Blvd, Chapel Hill",
    rating: 2,
    notes: "The Pizza Primavera is decent.",
    user_id: 1
  },
];

const seedRestaurants = () => Restaurant.bulkCreate(restaurantdata);

module.exports = seedRestaurants;
