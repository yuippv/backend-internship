require("dotenv").config();
require('./src/middlewares/index');
const express = require("express");
const passport = require("passport");

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

const auth = require('./src/Routes/auth');

app.use('/', auth);

app.get(
  '/profile',
  (req, res, next) => {
    res.json({
      message: 'You made it to the secure route',
      user: req.user,
      token: req.query.secret_token
    })
  }
);



app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});

