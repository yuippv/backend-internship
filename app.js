require("dotenv").config();
require('./src/middlewares/index');
const express = require("express");
const passport = require("passport");
const jwt = require("jsonwebtoken");

const connectToDatabase = require("./src/utils/mongo");
const app = express();
const port = 5000;

const connectMongo = async (req, res, next) => {
  await connectToDatabase();
  next();
};


app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(connectMongo);


//sign up
app.post(
  "/signup",
  passport.authenticate("signup", { session: false }),
  async (req, res, next) => {
    res.json({
      message: "Signup successful",
      user: req.user,
    });
  }
);

//log in
app.post("/login", async (req, res, next) => {
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

//view profile
app.get("/profile", (req, res, next) => {
  res.json({
    message: "You made it to the secure route",
    user: req.user,
    token: req.query.secret_token,
  });
});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
