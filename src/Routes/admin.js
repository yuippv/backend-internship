const express = require("express");
const router = express.Router();
const adminController = require("../controllers/adminController");

router.get("/results", adminController.getAllResult);
router.post("/admin", adminController.createAdmin);
router.get("/admin/:_id", adminController.getAdminById);
router.get("/admin", adminController.getAllAdmins);
router.post("/questions",adminController.postQuestion);
router.get("/questions",adminController.getQuestions);
router.get("/questions/cat",adminController.getQuestionByCat);


module.exports = router;
