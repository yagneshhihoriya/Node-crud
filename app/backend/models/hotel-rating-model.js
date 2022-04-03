const mongoose = require('mongoose');
const db = require('../db-con');

const HotelRatingSchema = db.Schema({
    hotelId: { type: mongoose.Types.ObjectId, ref: 'Hotel' },
    ratings: [{ email: String, rating: String }]

})

module.exports = db.model('HotelRating', HotelRatingSchema)