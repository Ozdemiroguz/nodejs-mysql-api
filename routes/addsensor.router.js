const express = require("express")
const router = express.Router()

const addSensorController = require("../controller/addsensor.controller")
const authMiddleware = require("../middleware/authMiddleware")

router.post("/addTemperatureHumidity", addSensorController.addTemperatureHumidity)
router.post("/addGas", authMiddleware, addSensorController.addGas)
router.post("/addFire", addSensorController.addFire)
router.post("/addMovement", addSensorController.addMovement)
router.post("/addPotHumidity", addSensorController.addPotHumidity)

module.exports = router