import express from "express";
import { login, register } from "../controllers/auth.js";

const router = express.Router();


// UPDATE
// DELETE
// GET
// GET ALL 


//CREATE NEW USER
router.post("/register", register);
router.post("/login", login);





export default router