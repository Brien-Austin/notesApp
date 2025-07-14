const bcrypt = require("bcryptjs");

const userModel = require("../models/user.model");
const {
  generateAccessToken,
  generateRefreshToken,
} = require("../../utils/jwt");

const register = async ({ email, password, name }) => {
  const existinguserModel = await userModel.findOne({ email });
  if (existinguserModel) throw new Error("userModel already exists");

  const hashedPassword = await bcrypt.hash(password, 10);

  const user = await userModel.create({
    email,
    name,
    password: hashedPassword,
  });

  const payload = { id: user._id, email: user.email };
  return {
    accessToken: generateAccessToken(payload),
    refreshToken: generateRefreshToken(payload),
    user: { id: user._id, email: user.email, name: user.name },
  };
};

const login = async ({ email, password }) => {
  const user = await userModel.findOne({ email }).select("+password");
  if (!user) throw new Error("User not found");

  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) throw new Error("Incorrect password");

  const payload = { id: user._id, email: user.email };
  return {
    accessToken: generateAccessToken(payload),
    refreshToken: generateRefreshToken(payload),
    user: { id: user._id, email: user.email, name: user.name },
  };
};

const refresh = async (refreshToken) => {
  const jwt = require("jsonwebtoken");
  const {
    verifyRefreshToken,
    generateAccessToken,
    generateRefreshToken,
  } = require("../utils/jwt.utils");

  try {
    const decoded = verifyRefreshToken(refreshToken);
    const payload = { id: decoded.id, email: decoded.email };

    return {
      accessToken: generateAccessToken(payload),
      refreshToken: generateRefreshToken(payload),
    };
  } catch (err) {
    throw new Error("Invalid refresh token");
  }
};

module.exports = {
  register,
  login,
  refresh,
};
