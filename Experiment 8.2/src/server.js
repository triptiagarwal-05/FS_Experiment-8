const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const protectedRoutes = require("./routes/protectedRoutes");
require("dotenv").config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middlewares
app.use(cors());
app.use(bodyParser.json());

// Routes
app.get("/", (req, res) => {
  res.send("JWT Protected Routes API is running...");
});

app.use("/api", protectedRoutes);

// Server start
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
