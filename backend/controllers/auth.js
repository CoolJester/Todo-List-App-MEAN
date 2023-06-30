const bcrypt = require("bcryptjs");

//Models
const userModel = require("../models/user");

/*
  POST request
  when a user tries to login
  public
*/
exports.postLogin = (req, res, next) => {};

/*
  POST request
  when a user tries to register
  public
*/
exports.postRegister = (req, res, next) => {
  //separate the data
  const email = req.body.email;
  const password = req.body.password;

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
            console.log("User stored to DB");
            res.status(201).json(data);
          })
          .catch((err) => {
            console.log("failed to store");
            res.status(500).json({
              status: "Failed",
              message: "Could not hash the password",
            });
          });
      })
      .catch((err) => {
        console.log("Something went wrong".red);
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
exports.postLogout = (req, res, next) => {};

/*
  POST request
  when a user tries to reset the password
  public
*/
exports.postReset = (req, res, next) => {};
