const express = require("express");
const {
  createUser,
  createResultById,
  getResultById

} = require("./src/functions/index");
const connectToDatabase = require("./src/utils/mongo");
const app = express();
const port = 2020;

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
    const user = await createUser(req.body);
    res.send(user);
  } catch (err) {
    res.status(err.status || 500).send(err.message || "Internal Server Error");
  }
});

app.post("/user/create/result/:id", async (req, res) => {
  try {
    const userid = req.params.id
    const  description  = req.body.description
    const  result  = req.body.result
    const  score  = req.body.score
    const user = await createResultById(description,result,score,userid );
    res.send(user);
  } catch (err) {
    res.status(err.status || 500).send(err.message || "Internal Server Error");
  }
});

app.get("/user/get/result/:id", async (req, res) => {
  try {
    const userid = req.params.id
 
    const user = await getResultById(userid);
    res.send(user);
  } catch (err) {
    res.status(err.status || 500).send(err.message || "Internal Server Error");
  }
});



app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
















