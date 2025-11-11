const express = require("express");
const router = express.Router();
const Estimate = require("../models/Estimate");
const generateEstimatePDF = require("../utils/generateEstimatePDF");

router.post("/", async (req, res) => {
    try {
        const estimate = new Estimate(req.body);
        const savedEstimate = await estimate.save();

        const pdfFile = await generateEstimatePDF(savedEstimate);

        res.status(201).json({
            message: "Estimate saved and PDF generated successfully",
            pdfFile,
            estimate: savedEstimate,
        });

    } catch (error) {
        console.error("Error creating estimate:", error);
        res.status(400).json({ message: error.message });
    }
});

router.get("/", async (req, res) => {
    try {
        const estimates = await Estimate.find();
        res.json(estimates);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

module.exports = router;