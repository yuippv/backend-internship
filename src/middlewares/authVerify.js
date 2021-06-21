const jwt = require("jsonwebtoken");
require("dotenv").config();

module.exports.authMiddleware = async (req, res, next) => {
  try {
    const authHeader = req.get('Authorization');
    const token = authHeader.split(' ')[1];
    jwt.verify(token, process.env.Secret_Key, async (err, authData) => {
      if (err) {
        res.sendStatus(403);
      } else {
        const user_info = authData.auth;
        req.userId = user_info._id;
        req.username = user_info.username;
        req.role = user_info.role;
      }
    });
    return next();
  } catch (err) {
    console.log("err: ", err);
    res.status(err.status || 500).send(err.message || "Internal Server Error");
  }
};
