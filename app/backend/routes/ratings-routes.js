const router = require('express').Router();
const ratingCtrl = require('../controllers/ratings-controller');

router.get('/', ratingCtrl.getHotels)
router.post('/add/rating', ratingCtrl.addRating)

module.exports = router