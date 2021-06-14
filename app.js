require("dotenv").config();
require('./src/middlewares/index');
const express = require("express");
const passport = require("passport");
const jwt = require("jsonwebtoken");
const {
  createUser,
  findUserById,
  updateUserById,
  deleteUserById,
  createResultById,
  getResultById,
} = require("./src/functions/index");

const connectToDatabase = require("./src/utils/mongo");
const app = express();
const port = 5000;


app.use(express.json());
app.use(express.urlencoded({ extended: false }));
connectToDatabase();

//create user
app.post("/user", async (req, res) => {
  try {
    const user = await createUser(req.body);
    res.send(user);
  } catch (err) {
    console.log("err: ", err);
    res.status(err.status || 500).send(err.message || "Internal Server Error");
  }
});

// find user by id
app.get("/user/:id", async (req, res) => {
  try {
    const userData = await findUserById(req.params.id);
    res.send(userData);
  } catch (err) {
    console.log("err: ", err);
    res.status(err.status || 500).send(err.message || "Internal Server Error");
  }
});

//update user by id
app.put("/user/:_id", async (req, res) => {
  try {
    const updateUser = await updateUserById(req.body, req.params._id);
    res.send(updateUser);
  } catch (err) {
    console.log("err:", err);
    res.status(err.status || 500).send(err.message || "Internal Server Error");
  }
});

app.delete("/user/:_id", async (req, res) => {
  try {
    const deleteUser = await deleteUserById(req.params._id);
    res.send(deleteUser);
  } catch (err) {
    console.log("err:", err);
    res.status(err.status || 500).send(err.message || "Internal Server Error");
  }
});
app.post("/user/create/result/:id", async (req, res) => {
  try {
    const userid = req.params.id;
    const description = req.body.description;
    const result = req.body.result;
    const score = req.body.score;
    const user = await createResultById(description, result, score, userid);
    res.send(user);
  } catch (err) {
    res.status(err.status || 500).send(err.message || "Internal Server Error");
  }
});

app.get("/user/result/:id", async (req, res) => {
  try {
    const userid = req.params.id;

    const user = await getResultById(userid);
    res.send(user);
  } catch (err) {
    res.status(err.status || 500).send(err.message || "Internal Server Error");
  }
});

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
  passport.authenticate("login", async (err, auth, info) => {
    try {
      if (err || !auth) {
        const error = new Error("An error occurred.");

        return next(error);
      }

      req.login(auth, { session: false }, async (error) => {
        if (error) return next(error);

        const body = { _id: auth._id, email: auth.AID };
        const token = jwt.sign({ auth: body }, "TOP_SECRET");

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
