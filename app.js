require("dotenv").config();
require("./src/middlewares/auth");
const express = require("express");
const multer = require("multer");
const adminRoute = require("./src/Routes/admin");
const userRoutes = require("./src/Routes/users");
const authRoutes = require("./src/Routes/auth");
const connectToDatabase = require("./src/utils/mongo");
const app = express();
const port = 5000;

const { uploadManyFile } = require("./src/utils/s3");

// const fileFilter = (req, file, cb) => {
//   if (
//     file.mimetype === "image/png" ||
//     file.mimetype === "image/jpg" ||
//     file.mimetype === "image/jpeg"
//   ) {
//     cb(null, true);
//   } else {
//     cb(null, false);
//   }
// };
// var fileLimits = {
//   files: 1, // allow only 1 file per request
//   fileSize: 1024 * 1024, // 1 MB (max file size)
// };

const connectMongo = async (req, res, next) => {
  await connectToDatabase();
  next();
};
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(connectMongo);

app.use("/", authRoutes);
//Buffer better
// app.post(
//   "/images/:userId",
//   multer({
//     dest: "uploads/",
//   }).array("photo", 10),
//   async (req, res) => {
//     //J calling
//     const userId = req.params.userId;
//     const file = req.files;
//     const result = await uploadManyFile(file, userId, "userResult");
//     console.log(result);
//     res.send(result);
//   }
// );

app.use(userRoutes);
app.use(adminRoute);
app.use((err, req, res, next) => {
  console.log("ERROR: ", err);
  res
    .status(err.status || 500)
    .json({ message: "System fail!", error: err.message, status: err.status });
});

app.use((err, req, res, next) => {
  console.log("ERROR: ", err);
  res.status(err.status || 500).json({ message: "Server fail!", error : err.message });
});


app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
