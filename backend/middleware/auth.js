const colors = require("colors");
const jwt = require("jsonwebtoken");

//Models
const User = require("../models/user");

module.exports = (req, res, next) => {
  //Check if we have a token
  if (!req.headers.authorization) {
    return res.status(403).json({ status: "Could not authenticate" });
  }

  //Validate the token
  const token = req.headers.authorization.split(" ")[1];
  jwt.verify(token, process.env.JWT_SECRET, (err, payload) => {
    if (err) {
      return res.status(403).json({ status: "Could not authenticate" });
    }

    //Check if user is valid
    User.findOne({ _id: payload.userId }).then((foundUser) => {
      if (!foundUser) {
        return res.status(403).json({
          status: "Could not authenticate",
        });
      }
      //Store the userId and pass it
      req.body.userId = foundUser._id;
      next();
    });
  });
};
