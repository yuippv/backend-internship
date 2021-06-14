const express = require("express");
const bookFunction = require("./src/functions/bookFunction");
const connectDB = require("./src/utils/mongo");
const app = express();
const port = 8080;

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(async (req, res, next) => {
  await connectDB();
  next();
});

app.get("/book/all", async (req, res, next) => {
  try {
    const books = await bookFunction.findAll();
    res.send(books);
  } catch (err) {
    next(err);
  }
});

app.get("/book/:id", async (req, res, next) => {
  try {
    // TODO
  } catch (err) {
    next();
  }
});

app.post("/book", async (req, res, next) => {
  try {
    const { name, price } = req.body;
    const book = await bookFunction.create({ name, price });
    res.status(201).send(book);
  } catch (err) {
    next(err);
  }
});

app.use((err, req, res, next) => {
  console.log("ERROR: ", err);
  res
    .status(err.statusCode || 500)
    .send(err.message || "Internal Server Error");
});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
