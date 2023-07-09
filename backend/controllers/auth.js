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
        res.status(404).json({
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
          res.status(403).json({
            status: "Login Failed",
            message: "Email or Password does not match",
          });
        }
      });
    })
    .catch((err) => {
      res.status(500).json({
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
      res.status(403).json({
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
            const token = jwt.sign(
              { userId: data._id },
              process.env.JWT_SECRET,
              {
                expiresIn: "30d",
              }
            );
            res.status(201).json({ token: token });
            res.end();
          })
          .catch((err) => {
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

/*
  POST request
  when a frontend tries to validate a user for auto login
  public
*/
exports.userValidate = (req, res, next) => {
  const token = req.body.token;

  jwt.verify(token, process.env.JWT_SECRET, (err, payload) => {
    if (err) {
      res.status(400);
      res.end();
    }

    //Check if user is valid
    userModel.findOne({ _id: payload.userId }).then((foundUser) => {
      if (!foundUser) {
        res.status(400);
        res.end();
      } else {
        res.status(200);
        res.end();
      }
    });
  });
};
