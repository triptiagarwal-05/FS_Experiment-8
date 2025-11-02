const express = require("express");
const router = express.Router();
const jwt = require("jsonwebtoken");
const users = require("../config/users");
const verifyToken = require("../middleware/authMiddleware");
const allowRoles = require("../middleware/roleMiddleware");

// 🟢 Login Route — issues JWT with role
router.post("/login", (req, res) => {
  const { username, password } = req.body;
  const user = users.find(
    (u) => u.username === username && u.password === password
  );

  if (!user) {
    return res.status(401).json({ message: "Invalid username or password." });
  }

  const secretKey = process.env.JWT_SECRET || "mysecretkey";
  const token = jwt.sign(
    { username: user.username, role: user.role },
    secretKey,
    { expiresIn: "1h" }
  );

  return res.json({
    message: "Login successful!",
    token,
    role: user.role
  });
});

// 🔒 General User Route
router.get("/user-profile", verifyToken, allowRoles("User", "Admin", "Moderator"), (req, res) => {
  res.json({
    message: `Welcome ${req.user.username}! This is your profile.`,
    role: req.user.role
  });
});

// 🔒 Moderator-only Route
router.get("/moderator-tools", verifyToken, allowRoles("Moderator", "Admin"), (req, res) => {
  res.json({
    message: `Hello ${req.user.username}! You have access to moderator tools.`,
    role: req.user.role
  });
});

// 🔒 Admin-only Route
router.get("/admin-dashboard", verifyToken, allowRoles("Admin"), (req, res) => {
  res.json({
    message: `Welcome Admin ${req.user.username}! This is your dashboard.`,
    role: req.user.role
  });
});

module.exports = router;
