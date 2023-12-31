const express = require("express")
const app = express()
const cors = require('cors');

require('dotenv').config()
app.use(cors());

app.use(express.urlencoded({ extended: false }))
app.use(express.json())

const userRouter = require('./routes/user.router')
const authRouter = require('./routes/auth.router')

app.use("/api/v1/user", userRouter)
app.use("/api/v1/auth", authRouter)

const PORT = process.env.PORT || 5000

app.listen(PORT, () => {
    console.log("Server is running....")
})
