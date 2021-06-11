const express = require("express");
const {
  crateBook,
  findBookByName,
  updateBookById,
  deleteBookById,
  softDeleteBookById,
} = require("./src/functions/index");
const connectToDatabase = require("./src/utils/mongo");
const app = express();
const port = 8080;

const connectMongo = async (req, res, next) => {
  await connectToDatabase();
  next();
};

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(connectMongo);

//create user
app.post("/user", async (req, res) => {
  try {
    console.log("req: ", req.body);
    const book = await crateBook(req.body);
    res.send(book);
  } catch (err) {
    console.log("err: ", err);
    res.send(err);
  }
});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
