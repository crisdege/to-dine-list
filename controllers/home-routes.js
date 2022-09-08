const router = require('express').Router();
const { List, Restaurant } = require('../models'); // need models, will probably update later
// middleware import
const withAuth = require('../utils/auth');

// GET restaurants list
router.get('/', withAuth, async (req, res) => {
    try {
        const dbListData = await List.findAll({
            include: [
                {
                    model: List,
                    attributes: ['name', 'cuisine', 'rating'], // will need to update depending on model attributes
                },
            ],
        });

        const list = dbListData.map((list) =>
            list.get({ plain: true })
        );
        res.render('homepage', {
            list,
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