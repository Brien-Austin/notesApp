const {
  registerController,
  loginController,
  refreshTokenController,
} = require("../controller/auth.controller");
const express = require("express");
const authRouter = express.Router();

authRouter.post("/register", registerController);
authRouter.post("/login", loginController);
authRouter.post("/refresh-token", refreshTokenController);

module.exports = authRouter;
