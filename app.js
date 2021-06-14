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
const secure = require('./src/Routes/secure')

app.use('/', auth);
app.use('/user', passport.authenticate('jwt', { session: false }), secure);

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
