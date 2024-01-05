const express = require("express");
const router = express.Router();
const getSensorController = require("../controller/getsensor.controller");
const authMiddleware = require("../middleware/authMiddleware"); // API anahtarını kontrol eden middleware

router.get("/getLatestSensorReading", authMiddleware, getSensorController.getLatestSensorReading);
router.get("/getSensorReadings10", authMiddleware, getSensorController.getSensorReadings10);
router.gr

module.exports = router; 