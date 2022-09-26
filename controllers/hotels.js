import Hotel from "../models/Hotel.js";

export const createHotel = async(req, res, next) => {

    //new hotel info from user
    const newHotel = new Hotel(req.body);
    try {
        const savedHotel = await newHotel.save();
        res.status(200).json(savedHotel)
    } catch (error) {
        next(error)
    }
}

export const updateHotel = async(req, res, next) => {
    try {
        const updatedHotel = await Hotel.findByIdAndUpdate(req.params.id, {$set: req.body}); //$set: req.body is a mongoDb set method that enables one get an individual id
        res.status(200).json(updatedHotel)
    } catch (error) {
        next(error)
    }
}

export const getHotel = async(req, res, next) => {

    try {
        const hotel = await Hotel.findById(req.params.id);
        res.status(200).json(hotel)
    } catch (error) {
        next(error)
    }
}

export const getAllHotel = async(req, res, next) => {
    const {min, max, ...others} = req.query;
    try {
        const hotels = await Hotel.find({...others, cheapestPrice: {$gt: min || 1, $lt: max || 999}}).limit(req.query.limit);
        res.status(200).json(hotels)
    } catch (error) {
        next(error)
    }
}

export const countByCity = async(req, res, next) => {
    const cities = req.query.cities.split(',') // the split method transforms the queries (strings) into an array and separates them by a comma
    try {
        // Promise.all helps to find multiple items
        const list = await Promise.all(cities.map(city=> {
            //Mongo DB countDocuments fetches the city count instead of using find({city:city}).length which may slow down the application as it will fetch all the cities first then check for the length of one city
            return Hotel.countDocuments({city:city})
        }))
        res.status(200).json(list)
    } catch (error) {
        next(error)
    }
}

export const countByType = async(req, res, next) => {
    try {
        const hotelCount = await Hotel.countDocuments({type: "hotel"});
        const apartmentCount = await Hotel.countDocuments({type: "apartment"});
        const resortCount = await Hotel.countDocuments({type: "resort"});
        const villaCount = await Hotel.countDocuments({type: "villa"});
        const cabinCount = await Hotel.countDocuments({type: "cabin"});
        res.status(200).json([
            {type: "hotels", count: hotelCount},
            {type: "apartments", count: apartmentCount},
            {type: "resorts", count: resortCount},
            {type: "villas", count: villaCount},
            {type: "cabin", count: cabinCount}
        ])
    } catch (error) {
        next(error)
    }
}

export const deleteHotel = async(req, res, next) => {
    try {
        await Hotel.findByIdAndDelete(req.params.id); 
        res.status(200).json("Hotel has been deleted")
    } catch (error) {
        next(error)
    }
}