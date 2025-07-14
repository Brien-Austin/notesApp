const jwt = require("jsonwebtoken");

const authenticate = (req, res, next) => {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];

  console.log("== [AUTH DEBUG] ==");
  console.log("Authorization Header:", authHeader);
  console.log("Extracted Token:", token);
  console.log("ACCESS_TOKEN_SECRET:", process.env.ACCESS_TOKEN_SECRET);

  if (!token) {
    console.log("Missing token");
    return res.status(401).json({ error: "Access token missing" });
  }

  try {
    const decoded = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
    console.log("Token Decoded Successfully:", decoded);
    req.user = decoded;
    next();
  } catch (err) {
    console.log("JWT Verification Error:", err.message);
    return res.status(403).json({ error: "Invalid or expired token" });
  }
};

module.exports = { authenticate };
