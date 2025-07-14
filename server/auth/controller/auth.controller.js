const { register, login, refresh } = require("../services/auth.service");

async function registerController(req, res) {
  const { email, password, name } = req.body;

  if (!email || !password) {
    return res.status(400).json({ error: "Email and password are required" });
  }

  try {
    const { user, accessToken, refreshToken } = await register({
      email,
      password,
      name,
    });

    res.status(201).json({
      message: "User registered successfully",
      user,
      accessToken,
      refreshToken,
    });
  } catch (error) {
    res.status(400).json({ error: error.message || "Registration failed" });
  }
}

async function loginController(req, res) {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ error: "Email and password are required" });
  }

  try {
    const { user, accessToken, refreshToken } = await login({
      email,
      password,
    });

    res.status(200).json({
      message: "Login successful",
      user,
      accessToken,
      refreshToken,
    });
  } catch (error) {
    if (error.message === "User not found") {
      return res.status(404).json({ error: "No account with that email." });
    }

    if (error.message === "Incorrect password") {
      return res
        .status(401)
        .json({ error: "Incorrect password. Please try again." });
    }

    res.status(500).json({ error: "Login failed. Please try again later." });
  }
}

async function refreshTokenController(req, res) {
  const { refreshToken } = req.body;

  if (!refreshToken) {
    return res.status(400).json({ error: "Refresh token is required" });
  }

  try {
    const newAccessToken = await refresh(refreshToken);
    res.status(200).json({
      message: "Access token refreshed",
      accessToken: newAccessToken,
    });
  } catch (error) {
    res.status(401).json({ error: error.message || "Invalid refresh token" });
  }
}

module.exports = {
  registerController,
  loginController,
  refreshTokenController,
};
