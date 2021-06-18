const express = require("express");
const router = express.Router();
const usersController = require("../controllers/usersController");

router.get("/user/find", usersController.findUserById);
router.put("/user", usersController.updateUserById);
router.delete("/user", usersController.deleteUserById);
router.post("/user/result", usersController.createResultById);
router.get("/user", usersController.getAllUsers);
router.post("/comment", usersController.postComment);
router.post("/guest", usersController.createGuest);
router.get("/user/result", usersController.getResultById);
router.post("/user/content", usersController.postContent);
router.get("/user/content/get", usersController.getAllContents);
router.post("/user/content/tag", usersController.getSortByTag);

module.exports = router;
