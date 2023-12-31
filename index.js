const express = require("express")
const app = express()
const cors = require('cors');

require('dotenv').config()
app.use(cors());

app.use(express.urlencoded({ extended: false }))
app.use(express.json())

const userRouter = require('./routes/user.router')
const authRouter = require('./routes/auth.router')
const roomRouter = require('./routes/room.router'); // Import the room router

app.use("/api/v1/user", userRouter)
app.use("/api/v1/auth", authRouter)
app.use("/api/v1/room", roomRouter); // Use the room router

const PORT = process.env.PORT || 5000

app.listen(PORT, () => {
    console.log("Server is running....")
})
