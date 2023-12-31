const express = require("express");
const router = express.Router();

const userController = require("../controller/user.controller");

router.get("/", userController.getAllUsers);
router.get("/:id", userController.getUserById);
router.post("/", userController.createUser);
router.put("/changePassword/:id", userController.changePassword);
router.put("/updateUser/:id", userController.updateUser);

router.delete("/:id", userController.deleteUser);

module.exports = router;