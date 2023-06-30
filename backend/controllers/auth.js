const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

//Models
const userModel = require("../models/user");

/*
  POST request
  when a user tries to login
  public
*/
exports.postLogin = (req, res, next) => {
  //separate the data
  const { email, password } = req.body;

  //Check if a user with this email exists
  userModel
    .findOne({ email: email })
    .then((user) => {
      //check if user is truthy
      if (!user) {
        res.status(500).json({
          status: "Failed",
          message: "User not found",
        });
        return;
      }
      //Validate the data
      bcrypt.compare(password, user.password).then((isValid) => {
        if (isValid) {
          //On success create token
          const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, {
            expiresIn: "30d",
          });
          res.status(200).json({
            status: "Login Successful",
            token: token,
          });
        } else {
          res.status(400).json({
            status: "Login Failed",
            message: "Email or Password does not match",
          });
        }
      });
    })
    .catch((err) => {
      res.status(400).json({
        status: "Failed",
        message: "Something went wrong",
      });
    });
};

/*
  POST request
  when a user tries to register
  public
*/
exports.postRegister = (req, res, next) => {
  //separate the data
  const { email, password } = req.body;

  //Check if a user with this email exists already
  userModel.findOne({ email: email }).then((user) => {
    //check if user is truthy
    if (user) {
      res.status(500).json({
        status: "Failed",
        message: "User already exists",
      });
      return;
    }
    //Hash the password and store
    bcrypt
      .hash(password, 10)
      .then((hashedPass) => {
        //Store to the database and return a result
        userModel
          .create({ email: email, password: hashedPass })
          .then((data) => {
            res.status(201).json(data);
            res.end();
          })
          .catch((err) => {
            console.log("failed to store");
            res.status(400).json({
              status: "Failed",
              message: "Could not Store the user",
            });
          });
      })
      .catch((err) => {
        res.status(500).json({
          status: "Failed",
          message: "Could not hash the password",
        });
      });
  });
};

/*
  POST request
  when a user tries to logout
  public
*/
exports.postLogout = (req, res, next) => {
  res.json({
    status: "Logout",
    message: "Goodbye",
  });
};

/*
  POST request
  when a user tries to reset the password
  public
*/
exports.postReset = (req, res, next) => {};
