const express = require("express");
const passport = require("passport");
const jwt = require("jsonwebtoken");

const router = express.Router();

router.post(
  "/signup",
  passport.authenticate("signup", { session: false }),
  async (req, res) => {
    res.json({
      message: "Signup successful",
      user: req.user,
    });
  }
);

router.post("/login", async (req, res, next) => {
  passport.authenticate("login", async (err, auth, info) => {
    try {
      if (err || !auth) {
        const error = new Error("An error occurred.");

        return next(error);
      }

      req.login(auth, { session: false }, async (error) => {
        if (error) return next(error);

        const body = {
          _id: auth._id,
          username: auth.username,
          role: auth.role,
        };
        const token = jwt.sign({ auth: body }, "TOP_SECRET", {
          expiresIn: "10",
        });

        return res.json({ token });
      });
    } catch (error) {
      return next(error);
    }
  })(req, res, next);
});

router.get("/profile", (req, res) => {
  res.json({
    message: "You made it to the secure route",
    username: req.username,
    token: req.query.secret_token,
  });
});

router.get("/logout", (req, res) => {
  req.logout();
  res.redirect("/");
});

module.exports = router;
