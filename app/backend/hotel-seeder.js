const hotels = require('./restaurants_sample.json');
const Hotel = require('./models/hotel-model');

(async () => {
    let existing = await Hotel.find({})
    let hotelList = []
    existing.map(ele => {
        if (!hotelList.find(hotel => ele.name == hotel.name)) {
            hotelList.push(ele)
        }
    })
    for (const hotel of hotels) {
        await Hotel.create({
            name: hotel.name,
            address: hotel.address,
            cost: hotel.cost,
            cuisines: hotel.cuisines,
            establishment: hotel.establishment,
            locality: hotel.locality,
            ratings: hotel.ratings,
            image: hotel.image,
        })
    }
    console.log('hotel data seeded');
})()