const httpCodes = require('http-status-codes').StatusCodes;
const Hotel = require('../models/hotel-model');
const HotelRating = require('../models/hotel-rating-model');
const errorHandler = require('../error-handler');

exports.getHotels = async (req, res) => {
    try {
        let hotelName = req.query.hotel
        let filter = {}
        if (hotelName) {
            filter = { name: { $regex: `.*${hotelName}.*`, $options: 'i' } }
        }
        let hotels = await Hotel.find(filter)
        return res.status(httpCodes.OK).json({
            status: httpCodes.OK,
            data: hotels
        })
    } catch (error) {
        return errorHandler.handleError(req, res, error)
    }
}

exports.addRating = async (req, res) => {
    try {
        let { hotelId, rating, email } = req.body
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

        if (!hotelId || !rating || !email) {
            return res.status(httpCodes.BAD_REQUEST).json({
                status: httpCodes.BAD_REQUEST,
                message: "hotelId and rating,email is required"
            })
        }

        const validEmail = emailRegex.test(email)

        if (!validEmail) {
            return res.status(httpCodes.BAD_REQUEST).json({
                status: httpCodes.BAD_REQUEST,
                message: 'enter a valid email'
            })
        }
        let hotel = await Hotel.findById(hotelId)

        if (!hotel) {
            return res.status(httpCodes.BAD_REQUEST).json({
                status: httpCodes.BAD_REQUEST,
                message: 'no hotel with given id'
            })
        }
        let isExist = await HotelRating.findOne({ hotelId })

        if (!isExist) {
            await HotelRating.create({ hotelId, ratings: [{ email, rating }] })
            return res.status(httpCodes.OK).json({
                status: httpCodes.OK,
                message: 'rating is recorded'
            })
        }
        let hasRated = isExist.ratings.find(ele => ele.email == email)
        if (hasRated) {
            return res.status(httpCodes.BAD_REQUEST).json({
                status: httpCodes.BAD_REQUEST,
                message: 'user rating is already recorded'
            })
        }

        let sum = isExist.ratings.map(ele => { return Number(ele.rating) }).reduce((acc, cur) => acc + cur, 0)
        let totalRatings = isExist.ratings.length + 1
        sum += Number(rating)
        let average = (sum / totalRatings).toFixed(2)

        await HotelRating.findByIdAndUpdate(isExist._id.toString(), {
            $push: { ratings: { rating, email } }
        })

        let result = await Hotel.findByIdAndUpdate(hotelId, { ratings: average })
        return res.status(httpCodes.OK).json({
            status: httpCodes.OK,
            message: "rating is recorded"
        })
    } catch (error) {
        return errorHandler.handleError(req, res, error)
    }
}