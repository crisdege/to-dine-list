const router = require('express').Router();
const { Restaurant, Cuisine, User } = require('../models');
// middleware import
// const withAuth = require('../utils/auth');

// GET restaurants list for homepage
router.get('/', async (req, res) => {
    if (!req.session.loggedIn) {
        // render homepage without user authentication
        res.render('homepage', { loggedIn: false });
    } else {
        // render homepage with user's restaurants list
        try {
            // get restaurants by user id
            const dbRestaurantData = await Restaurant.findAll({
                // get user id from session id
                where: { user_id: req.session.user_id },
                include: [
                    {
                        model: Restaurant,
                        attributes: ['id', 'name', 'cuisine_id', 'rating']
                    },
                    {
                        model: Cuisine,
                        attributes: ['id', 'name', 'cuisine_image']
                    }
                ],
            });
        } catch (err) {
            console.log(err);
            res.status(500).json(err);
        };

        if (!dbRestaurantData) {
            // if the user has no restaurants, go to add restaurant page
            res.render('add-restaurant', { loggedIn: req.session.loggedIn });
        } else {
            // if the user has restaurants, clean them up for use by handlebars
            const restaurantData = dbRestaurantData.map((restaurant) =>
                restaurantData.get({ plain: true })
            );

            // add boolean values for displaying ratings
            let restaurants = restaurantData.map((restaurant) => {
                restaurant.rating1 = false;
                restaurant.rating2 = false;
                restaurant.rating3 = false;

                if (restaurant.rating === 0) {
                    restaurant.ratingCheck = false;
                } else {
                    restaurant.ratingCheck = true;

                    if (restaurant.rating === 1) {
                        restaurant.rating1 = true;
                    } else if (restaurant.rating === 2) {
                        restaurant.rating2 = true;
                    } else {
                        restaurant.rating3 = true;
                    };
                };
            })

            // render homepage with user's restaurants
            res.render('homepage', {
                restaurants,
                loggedIn: req.session.loggedIn
            });
        };
    };
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