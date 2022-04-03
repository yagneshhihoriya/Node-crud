const db = require('../db-con');

const HotelSchema = db.Schema({
    name: String,
    address: String,
    cost: String,
    cuisines: [String],
    establishment: [String],
    locality: String,
    ratings: String,
    image: String,
})

module.exports = db.model('Hotel', HotelSchema) 