const router = require('express').Router();
const { Restaurant } = require('../../models'); // need models, may update later
// middleware import
const withAuth = require('../../utils/auth');

// POST or create new restaurant card
router.post('/restaurants', withAuth, (req, res) => {
    Restaurant.create({
        // model attributes go here, req.body. etc.
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
            // model attributes go here, req.body. etc.
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