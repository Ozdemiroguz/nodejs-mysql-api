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
const tempHumRouter = require('./routes/temphum.router');// Import the temphum router
const addSensorRouter = require('./routes/addsensor.router');// Import the addSensor router
const getSensorRouter = require('./routes/getsensor.router');// Import the getSensor router
const authMiddleware = require("./middleware/authMiddleware");

app.use("/api/v1/user", userRouter)// Use the user router
app.use("/api/v1/auth", authRouter)// Use the auth router
app.use("/api/v1/room", roomRouter); // Use the room router
app.use("/api/v1/temp_hum", tempHumRouter);// Use the temphum router
app.use("/api/v1/addSensor", addSensorRouter);// Use the addSensor router
app.use("/api/v1/getSensor", getSensorRouter);// Use the getSensor router
app.use(authMiddleware);// Use the authMiddleware

const PORT = process.env.PORT || 5000

app.listen(PORT, () => {
    console.log("Server is running....")
})
