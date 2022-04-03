const router = require('express').Router();
const ratingsRoutes = require('./ratings-routes');

router.use('/hotel', ratingsRoutes)

module.exports = router