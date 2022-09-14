const router = require('express').Router();

const userRoutes = require('./user-routes');
const restaurantRoutes = require('./restaurant-routes');

router.use('/users', userRoutes);
router.use('/restaurants', restaurantRoutes);

module.exports = router;