const express = require("express");
const passport = require("passport");
const jwt = require("jsonwebtoken");

const router = express.Router();

//sign up
router.post(
  "/signup",
  passport.authenticate("signup", { session: false }),
  async (req, res, next) => {
    res.json({
      message: "Signup successful",
      user: req.user,
    });
  }
);
router.post("/login", async (req, res, next) => {
  passport.authenticate("login", async (err, auths, info) => {
    try {
      if (err || !auths) {
        const error = new Error("An error occurred.");

        return next(error);
      }

      req.login(auths, { session: false }, async (error) => {
        if (error) return next(error);

        const body = { _id: auths._id, email: auths.AID };
        const token = jwt.sign({ auths: body }, "TOP_SECRET");

        return res.json({ token });
      });
    } catch (error) {
      return next(error);
    }
  })(req, res, next);
});
module.exports = router;
