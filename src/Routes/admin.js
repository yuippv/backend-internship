const express = require("express");
const router = express.Router();
const adminController = require("../controllers/adminController");
const auth = require("../middlewares/authVerify");

router.get("/results", auth.authMiddleware, adminController.getAllResult);
router.get("/admin/find", auth.authMiddleware, adminController.getAdminById);
router.get("/admin", auth.authMiddleware, adminController.getAllAdmins);
router.post("/questions", auth.authMiddleware, adminController.postQuestion);
router.get("/questions", auth.authMiddleware, adminController.getQuestions);
router.get(
  "/questions/cat",
  auth.authMiddleware,
  adminController.getQuestionByCat
);

module.exports = router;
