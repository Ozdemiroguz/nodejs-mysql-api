const express = require("express")
const router = express.Router()

const userController = require("../controller/user.controller")

router.get("/", userController.getAll)
router.get("/:id", userController.getById)
router.post("/", userController.create)
router.put("/:id", userController.update)
router.delete("/:id", userController.delete)

module.exports = router
