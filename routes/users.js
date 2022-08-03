import express from "express";
import {updateUser, deleteUser, getAllUser, getUser } from "../controllers/user.js";
import { verifyAdmin, verifyToken, verifyUser } from "../utils/verifyToken.js";

const router = express.Router();

// // USER AUTH CHECK
// router.get("/authCheck", verifyToken, (req, res, next) => {
//     res.send("User has been logged in successfully.")
// })

// // SINGLE USER AUTH CHECK
// router.get("/authCheckUser/:id", verifyUser, (req, res, next) => {
//     res.send("User has been logged in successfully and can delete their account.")
// })

// // ADMIN AUTH CHECK
// router.get("/authCheckAdmin/:id", verifyAdmin, (req, res, next) => {
//     res.send("Admin has been logged in successfully and can delete all accounts.")
// })

// UPDATE
router.put("/:id", verifyUser, updateUser)

// DELETE
router.delete("/:id", verifyUser, deleteUser)

// GET
router.get("/:id", verifyUser, getUser)

// GET ALL
router.get("/", verifyAdmin, getAllUser)


export default router;