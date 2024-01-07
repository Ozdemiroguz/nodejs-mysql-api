const express = require("express")
const router = express.Router()

const addSensorController = require("../controller/addsensor.controller")
const authMiddleware = require("../middleware/authMiddleware")

router.post("/addTemperatureHumidity", authMiddleware, addSensorController.addTemperatureHumidity)
router.post("/addGas", authMiddleware, addSensorController.addGas)
router.post("/addFire", authMiddleware, addSensorController.addFire)
router.post("/addMovement", authMiddleware, addSensorController.addMovement)
router.post("/addPotHumidity", authMiddleware, addSensorController.addPotHumidity)
router.delete("/deleteSensorTable/:sensorType", authMiddleware, addSensorController.deleteSensorTable)


module.exports = router