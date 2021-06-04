const express = require("express");
const app = express();
const port = 8080;

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.get("/test/:id/:count", (req, res) => {
  console.log({ param: req.params });
  console.log({ query: req.query });
  res.send({ head: "Hello world" });
});

app.post("/demo", (req, res) => {
  console.log("req: ", req.body);
  res.send("Hello World!");
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
