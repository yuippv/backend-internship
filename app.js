const express = require("express");
const { crateBook, findBookByName } = require("./src/functions/index");
const connectToDatabase = require('./src/utils/mongo')
const app = express();
const port = 8080;

const connectMongo = async (req, res, next) => {
  await connectToDatabase();
  next();
};

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(connectMongo);

app.get("/book/:name", async (req, res) => {
  // console.log({ param: req.params });
  // console.log({ query: req.query });
  const bookData = await findBookByName(req.params.name)
  res.send(bookData);
});

app.post("/create/book", async (req, res) => {
  console.log("req: ", req.body);
  const book = await crateBook(req.body);
  res.send(book);
});

app.put("/", (req, res) => {
  console.log("req: ", req.body);
  res.send("Hello World!");
});

app.delete("/", (req, res) => {
  console.log("req: ", req.body);
  res.send("Hello World!");
});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
