const jwt = require("jsonwebtoken");
// const { userModel } = require("../models/userSchema");
require("dotenv").config();

const auth = (req, res, next) => {
  const accessToken = req.headers.authorization?.split(" ")[1];

  if (accessToken) {
    jwt.verify(accessToken, "masai", async (err, decoded) => {
      if (decoded) {
        console.log(decoded);
        req.body.userID = decoded.userID;
        req.body.userName = decoded.userName;
         next();
      }else{
        res.json(err);
      }
    });
  } else {
    res.status(401).json({ msg: "Please login" });
  }
};

module.exports = {
  auth,
};
