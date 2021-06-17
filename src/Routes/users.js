const express = require("express");
const router = express.Router();
const usersController = require("../controllers/usersController");

router.post("/user", usersController.createUsers);
//_id กับ id ?
router.get("/user/:_id", usersController.findUserById);
router.put("/user/:_id", usersController.updateUserById);
router.delete("/user/:_id", usersController.deleteUserById);
router.post("/user/result/:_id", usersController.createResultById);
router.get("/user", usersController.getAllUsers);
router.post("/comment", usersController.postComment);
router.post("/guest", usersController.createGuest);
router.get("/user/result/:_id", usersController.getResultById);
router.post("/user/content", usersController.postContent);
router.get("/user/content/get", usersController.getAllContents);
router.post("/user/content/tag", usersController.getSortByTag);

module.exports = router;
