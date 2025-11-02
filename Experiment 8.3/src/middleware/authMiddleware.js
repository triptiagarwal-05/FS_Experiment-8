const jwt = require("jsonwebtoken");

// Verifies JWT and attaches decoded user info to the request
const verifyToken = (req, res, next) => {
  const authHeader = req.headers["authorization"];

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res.status(401).json({ message: "Access denied. No token provided." });
  }

  const token = authHeader.split(" ")[1];
  const secretKey = process.env.JWT_SECRET || "mysecretkey";

  try {
    const decoded = jwt.verify(token, secretKey);
    req.user = decoded; // contains username and role
    next();
  } catch (err) {
    return res.status(403).json({ message: "Invalid or expired token." });
  }
};

module.exports = verifyToken;
