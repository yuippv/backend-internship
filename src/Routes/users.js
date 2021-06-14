const express = require("express");
const router = express.Router();
const usersController = require("../controllers/usersController");

router.post("/user", usersController.createUsers);
//_id กับ id ?
router.get("/user/:id", usersController.findUserById);
router.put("/user/:_id", usersController.updateUserById);
router.delete("/user/:_id", usersController.deleteUserById);
router.post("/user/create/result/:id", usersController.createResultById);
router.get("/user", usersController.getAllUsers);
router.post("/comment", usersController.postComment);
router.post("/guest", usersController.createGuest);
router.get("/user/result/:id", usersController.getResultById);

module.exports = router;
