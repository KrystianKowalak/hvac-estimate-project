const express = require("express");
const router = express.Router();
const path = require("path");
const apiRoutes = require("./api");

router.use("/api", apiRoutes);

router.use("/pdfs", express.static(path.join(__dirname, "..", "..", "pdfs")));

router.get("/", (req, res) => {
    res.send("HVAC Estimate API is running");
});

module.exports = router;