const express = require("express");
const router = express.Router();
const jwt = require("jsonwebtoken");
const verifyToken = require("../middleware/authMiddleware");
const user = require("../config/users");

// 🟢 Public Login Route — returns JWT if credentials are correct
router.post("/login", (req, res) => {
  const { username, password } = req.body;

  if (username === user.username && password === user.password) {
    const secretKey = process.env.JWT_SECRET || "mysecretkey";
    const token = jwt.sign({ username }, secretKey, { expiresIn: "1h" });

    return res.json({
      message: "Login successful!",
      token
    });
  } else {
    return res.status(401).json({ message: "Invalid credentials." });
  }
});

// 🔒 Protected Route — accessible only with valid JWT
router.get("/dashboard", verifyToken, (req, res) => {
  return res.json({
    message: `Welcome, ${req.user.username}! You have access to this protected route.`,
    data: {
      projects: ["API Security", "JWT Demo", "Node.js Learning"]
    }
  });
});

module.exports = router;
