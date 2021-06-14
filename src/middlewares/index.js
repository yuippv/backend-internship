// middlewares function structure
// const jwt = require("jsonwebtoken");
// const connectToDatabase = require("../../src/utils/mongo");

// module.exports.connectMongo = async (req, res, next) => {
//   await connectToDatabase();
//   next();
// };

// module.exports.authenFunction = (req, res, next) => {
//   if (req.headers.authorization) {
//     const authorization = req.headers.authorization.split(" ")[1];
//     const decoded = jwt.verify(authorization, process.env.TOKEN_SECRET);
//     req.username = decoded.username;
//   }
//   next();
// };

// module.exports.generateAccessToken = (username) => {
//     return jwt.sign({ username }, process.env.TOKEN_SECRET, { expiresIn: 36000 });
//   };
