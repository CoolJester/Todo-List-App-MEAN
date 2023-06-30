const express = require("express");

//Middlewares
const auth = require("../middleware/auth");

const {
  postLogin,
  postRegister,
  postLogout,
  postReset,
} = require("../controllers/auth");

const authRouter = express.Router();

authRouter.post("/login", postLogin);
authRouter.post("/register", postRegister);
authRouter.post("/logout", auth, postLogout);
authRouter.post("/reset", auth, postReset);

module.exports = authRouter;
