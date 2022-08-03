import express from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";
import authRoute from "./routes/auth.js"
import usersRoute from "./routes/users.js"
import hotelsRoute from "./routes/hotels.js"
import roomsRoute from "./routes/rooms.js"
import cookieParser from "cookie-parser";


const app = express();
dotenv.config();
const PORT = process.env.PORT || 4000

const connect = async () => {
    try {
        await mongoose.connect(process.env.MONGO);
        console.log("Connected to MongoDB")
      } catch (error) {
        throw error;
      }
}

// if there is a connection problem
mongoose.connection.on("disconnected", () => {
    console.log("Disconnected from MongoDB")
})


// middlewares

app.use(cookieParser())

// this enables express receive json objects
app.use(express.json())

app.use("/api/auth", authRoute)
app.use("/api/users", usersRoute)
app.use("/api/hotels", hotelsRoute)
app.use("/api/rooms", roomsRoute)


// handling errors in express server

app.use((err, req, res, next) => {
  const errorStatus = err.status || 500
  const errorMessage = err.message || "Sorry, there is a problem with our server."
  return res.status(errorStatus).json({
    success: false,
    status: errorStatus,
    message: errorMessage,
    stack: err.stack
  })
})






app.listen(PORT, () => {
    connect()
    console.log(`App is running at port ${PORT}`)
})


// 1:24:00