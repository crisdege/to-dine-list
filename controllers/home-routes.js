const router = require("express").Router();
const { Restaurant, Cuisine, User } = require("../models");
// middleware import
const withAuth = require('../utils/auth');

// GET restaurants list for homepage
router.get("/", async (req, res) => {
  if (!req.session.loggedIn || !req.session.user_id) {
    // render homepage without user authentication
    res.render("homepage", { loggedIn: false });
  } else {
    // render homepage with user's restaurants list
    Restaurant.findAll({
      // get restaurants by user id
      // get user id from session id
      where: { user_id: req.session.user_id },
      attributes: ["id", "name", "cuisine_id", "rating"],
      include: [
        {
          model: Cuisine,
          attributes: ["id", "name", "cuisine_image"],
        },
      ],
    })
      .then((dbRestaurantData) => {
        // serialize restaurants list
        const restaurantData = dbRestaurantData.map(restaurant => restaurant.get({ plain: true }));

        if (restaurantData.length == 0) {
          // if the user has no restaurants, go to add restaurant page
          res.render("add-restaurant");
        } else {
          // add boolean values for displaying ratings
          // let restaurants = restaurantData.map((...restaurant) => {
            
          let restaurants = [];

          for (i = 0; i < restaurantData.length; i++) {

            if (restaurantData[i].rating === 0) {
              restaurantData[i].ratingCheck = false;
            } else {
              restaurantData[i].ratingCheck = true;
            };

            if (restaurantData[i].rating === 1) {
              restaurantData[i].rating1 = 'star';
              restaurantData[i].rating2 = 'star-outline';
              restaurantData[i].rating3 = 'star-outline';
            } else if (restaurantData[i].rating ===2) {
              restaurantData[i].rating1 = 'star';
              restaurantData[i].rating2 = 'star';
              restaurantData[i].rating3 = 'star-outline';
            } else if (restaurantData[i].rating === 3) {
              restaurantData[i].rating1 = 'star';
              restaurantData[i].rating2 = 'star';
              restaurantData[i].rating3 = 'star';
            };

            restaurants.push(restaurantData[i]);
          };

          console.log('restaurants')
          console.log(restaurants);

          // render homepage with user's restaurants
          res.render("homepage", {
            restaurants,
            loggedIn: req.session.loggedIn,
            user_id: req.session.user_id
          });
        }
      })
      .catch((err) => {
        console.log(err);
        res.status(500).json(err);
      });
  }
});

// render add a restaurant page
router.get('/add', withAuth, (req, res) => {
  res.render('add-restaurant');
});

// GET one restaurant
// router.get('/:id', withAuth, async (req, res) => {
//     try {
//         const dbRestaurantData = await Restaurant.findByPk(req.params.id);

//         const restaurant = dbRestaurantData.get({ plain: true });

//         res.render('view-restaurant', { restaurants, loggedIn: req.session.loggedIn });
//     } catch (err) {
//         console.log(err);
//         res.status(500).json(err);
//     }
// });

// router.get('/login', (req, res) => {
//     if (req.session.loggedIn) {
//         res.redirect('/');
//         return;
//     }

//     res.render('login');
// });

module.exports = router;
