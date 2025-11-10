const express = require("express");
const cors = require("cors");
const connectDB = require("./config/db");
const estimateRoutes = require("./routes/estimateRoutes");
const path = require("path");
const fs = require("fs");
require("dotenv").config();

const app = express();
app.use(express.json());
app.use(cors());

connectDB();
app.use("/api/estimates", estimateRoutes);
app.use("/pdfs", express.static(path.join(__dirname, "pdfs")));

app.get("/", (req, res) => {
  res.send("HVAC Estimate API is running");
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});