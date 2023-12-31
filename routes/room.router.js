const express = require("express");
const router = express.Router();

const roomController = require("../controller/room.controller");
router.get("/:roomId", roomController.getRoomById);
router.get("/:userId/rooms", roomController.getRoomsByUserId);
router.post("/:userId/rooms", roomController.createRoom);
router.put("/:userId/rooms/:roomId", roomController.updateRoom);
router.delete("/:userId/rooms/:roomId", roomController.deleteRoom);

module.exports = router;
