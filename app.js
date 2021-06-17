require("dotenv").config();
const express = require("express");
const adminRoute = require("./src/Routes/admin")
const userRoutes = require("./src/Routes/users")

const connectToDatabase = require('./src/utils/mongo')
const app = express();
const port = 6060;

const connectMongo = async (req, res, next) => {
  await connectToDatabase();
  next();
};

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(connectMongo);
app.use(userRoutes)
app.use(adminRoute)

app.use("/", authRoutes);
//Buffer better
app.post(
  "/images/:userId",
  multer({
    dest: "uploads/",
  }).array("photo", 10),
  async (req, res) => {
    //J calling
    const userId = req.params.userId
    const file = req.files
    const result = await uploadManyFile(file,userId,"userResult")
    console.log(result);
    res.send(result);
  }
);
app.use(userRoutes);
app.use(adminRoute);

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
















