require("dotenv").config();
const express = require("express");
const {
  crateBook,
  findBookByName,
  updateBookById,
  deleteBookById,
  softDeleteBookById,
} = require("./src/functions/index");
const { connectMongo, authenFunction, generateAccessToken } = require('./src/middlewares')
const app = express();
const port = 8080;

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(connectMongo);
app.use(authenFunction);

// findbook
app.get("/book/:namename", async (req, res) => {
  // console.log({ param: req.params });
  // console.log({ query: req.query });
  try {
    const bookData = await findBookByName(req.params.namename);
    res.send(bookData);
  } catch (err) {
    console.log("err: ", err);
    res.send(err);
  }
});

app.get("/login", async (req, res) => {
  try {
    const jwtResponse = generateAccessToken(req.query.username);
    res.send(jwtResponse);
  } catch (err) {
    console.log("err: ", err);
    res.send(err);
  }
});


app.get("/user", async (req, res) => {
  try {
    // do sth
    res.send(req.username);
  } catch (err) {
    console.log("err: ", err);
    res.send(err);
  }
});

//create book
app.post("/create/book", async (req, res) => {
  try {
    console.log("req: ", req.body);
    const book = await crateBook(req.body);
    res.send(book);
  } catch (err) {
    console.log("err: ", err);
    res.send(err);
  }
});

//update book
app.put("/edit/book", async (req, res) => {
  try {
    const updateBook = await updateBookById(req.body);
    res.send(updateBook);
  } catch (err) {
    console.log("err: ", err);
    res.send(err);
  }
});

//delete book
app.delete("/delete/book", async (req, res) => {
  try {
    console.log("req: ", req.body);
    const deleteBook = await softDeleteBookById(req.body);
    res.send(deleteBook);
  } catch (err) {
    console.log("err: ", err);
    res.send(err);
  }
});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
