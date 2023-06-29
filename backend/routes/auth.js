const express = require("express");

const { postLogin, postRegister, postLogout, postReset } = require("../controllers/auth");

const authRouter = express.Router();

authRouter.post("/login", postLogin);
authRouter.post("/register", postRegister);
authRouter.post("/logout", postLogout);
authRouter.post("/reset", postReset);

module.exports = authRouter;
