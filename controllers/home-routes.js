const router = require('express').Router();
const { Restaurant, Cuisine } = require('../models');
// middleware import
const withAuth = require('../utils/auth');

// GET restaurants list for homepage
router.get('/', withAuth, async (req, res) => {
    try {
        const dbRestaurantData = await Restaurant.findAll({
            include: [
                {
                    model: Restaurant,
                    attributes: ['name', 'cuisine_id', 'rating'],
                },
                {
                    model: Cuisine,
                    attributes: ['id', 'name']
                }
            ],
        });

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

        // add imgName
        // this code needs to be added based on Cristina's images

        res.render('homepage', {
            restaurants,
            loggedIn: req.session.loggedIn,
        });
    } catch (err) {
        console.log(err);
        res.status(500).json(err);
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

router.get('/login', (req, res) => {
    if (req.session.loggedIn) {
        res.redirect('/');
        return;
    }

    res.render('login');
});

module.exports = router;