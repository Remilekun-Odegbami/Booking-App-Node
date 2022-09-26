import express from "express";
import { countByCity, countByType, createHotel, deleteHotel, getAllHotel, getHotel, updateHotel } from "../controllers/hotels.js";
import { verifyAdmin } from "../utils/verifyToken.js";

const router = express.Router();

//CREATE
router.post("/", verifyAdmin, createHotel);

// UPDATE
router.put("/:id", verifyAdmin, updateHotel)

// DELETE
router.delete("/hotels/:id", verifyAdmin, deleteHotel)

// GET SINGLE HOTEL
router.get("/hotels/:id", getHotel)

// GET ALL
router.get("/", getAllHotel)

// GET HOTEL CITIES
router.get("/countByCity", countByCity)

router.get("/countByType", countByType)


export default router;