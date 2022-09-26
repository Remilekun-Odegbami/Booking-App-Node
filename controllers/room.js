import Room from "../models/Room.js";
import Hotel from "../models/Hotel.js";
import { createError } from "../utils/error.js";

export const createRoom  = async(req, res, next) => {
    // after creating a new room, room must be added to the room array in Hotel.js
    const hotelId = req.params.hotelId;
    const newRoom = new Room(req.body)

    try {
        const savedRoom = await newRoom.save()
        try {
            await Hotel.findByIdAndUpdate(hotelId, {
                // mongoDb function to push saved room id inside Hotel rooms array
                $push: {rooms: savedRoom._id}
            })
        } catch (error) {
            next(error)
        }
        // return saved room
        res.status(200).json(savedRoom)
    } catch (error) {
        next(error)        
    }
};


export const updateRoom = async(req, res, next) => {
    try {
        const updatedRoom = await Room.findByIdAndUpdate(
            req.params.id, 
            {$set: req.body}, //$set: req.body is a mongoDb set method that enables one get an individual id
            { new: true } // this returns the new version of the updated room
        ); 
        res.status(200).json(updatedRoom)
    } catch (error) {
        next(error)
    }
}

export const getRoom = async(req, res, next) => {

    try {
        const room = await Room.findById(req.params.id);
        res.status(200).json(room)
    } catch (error) {
        next(error)
    }
}

export const getAllRooms = async(req, res, next) => {
    try {
        const rooms = await Room.find();
        res.status(200).json(rooms)
    } catch (error) {
        next(error)
    }
}

export const deleteRoom = async(req, res, next) => {
    const hotelId = req.params.hotelId;
    try {
        await Room.findByIdAndDelete(req.params.id); 
        try {
            await Hotel.findByIdAndUpdate(hotelId, {
                // mongoDb function to pull saved room id from Hotel rooms array
                $pull: {rooms: req.params.id}
            })
        } catch (error) {
            next(error)
        }
        res.status(200).json("Room has been deleted")
    } catch (error) {
        next(error)
    }
}