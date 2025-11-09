const express = require("express");
const cors = require("cors");
const connectDB = require("./config/db");
const estimateRoutes = require("./routes/estimateRoutes");
require("dotenv").config();

const app = express();
app.use(express.json());
app.use(cors());

app.get("/", (req, res) => {
  res.send("HVAC Estimate API is running");
});

connectDB();
app.use("/api/estimates", estimateRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});