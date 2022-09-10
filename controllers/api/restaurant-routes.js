const router = require('express').Router();
const { Restaurant, Cuisine } = require('../../models');
// middleware import
const withAuth = require('../../utils/auth');

// GET restaurants
router.get('/', (req, res) => {
    Restaurant.findAll({
        include: [
            {
                model: Restaurant,
                attributes: ['id', 'name', 'cuisine_id', 'location', 'rating', 'notes'],
                include: {
                    model: Cuisine,
                    attributes: ['id','name']
                }
            },
            {
                model: Cuisine,
                attributes: ['id', 'name']
            }
        ]
    })
        .then(dbRestaurantData => res.json(dbRestaurantData))
        .catch(err => {
            console.log(err);
            res.status(500).json(err);
        });
});

// GET one restaurant by id
router.get('/:id', (req, res) => {
    Restaurant.findOne({
        where: {
            id: req.params.id
        },
        include: [
            {
                model: Cuisine,
                attributes: ['id', 'name'],
                include: {
                    model: User,
                    attributes: ['username']
                }
            },
            {
                model: User,
                attributes: ['username']
            }
        ]
    })
        .then(dbRestaurantData => {
            if (!dbRestaurantData) {
                res.status(404).json({ message: 'No restaurant found with this id' });
                return;
            }
            res.json(dbRestaurantData);
        })
        .catch(err => {
            console.log(err);
            res.status(500).json(err);
        });
});

// POST or create new restaurant card
router.post('/', withAuth, (req, res) => {
    Restaurant.create({
        name: req.body.name,
        cuisine: req.body.cuisine_id,
        location: req.body.location,
        rating: req.body.rating,
        notes: req.body.notes
    })
        .then(dbRestaurantData => {
            res.json(dbRestaurantData)
        })
        .catch(err => {
            console.log(err);
            res.status(500).json(err);
        });
});

// PUT or edit a restaurant card
router.put('/:id', withAuth, (req, res) => {
    Restaurant.update(
        {
            name: req.body.name,
            cuisine: req.body.cuisine_id,
            location: req.body.location,
            rating: req.body.rating,
            notes: req.body.notes
        },
        {
            where: {
                id: req.params.id
            }
        }
    )
        .then(dbRestaurantData => {
            if (!dbRestaurantData) {
                res.status(404).json({ message: 'No restaurant found with this id' });
                return;
            }
            res.json(dbRestaurantData);
        })
        .catch(err => {
            console.log(err);
            res.status(500).json(err);
        });
});

module.exports = router;