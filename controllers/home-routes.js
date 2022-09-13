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

        const restaurant = dbRestaurantData.map((restaurant) =>
            restaurant.get({ plain: true })
        );
        res.render('homepage', {
            restaurant,
            loggedIn: req.session.loggedIn,
        });
    } catch (err) {
        console.log(err);
        res.status(500).json(err);
    }
});

// GET one restaurant
router.get('/restaurants/:id', withAuth, async (req, res) => {
    try {
        const dbRestaurantData = await Restaurant.findByPk(req.params.id);

        const restaurant = dbRestaurantData.get({ plain: true });

        res.render('restaurant', { restaurant, loggedIn: req.session.loggedIn });
    } catch (err) {
        console.log(err);
        res.status(500).json(err);
    }
});

router.get('/login', (req, res) => {
    if (req.session.loggedIn) {
        res.redirect('/');
        return;
    }

    res.render('login');
});

module.exports = router;