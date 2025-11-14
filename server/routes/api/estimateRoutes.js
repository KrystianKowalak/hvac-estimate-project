const router = require("express").Router();
const { Estimate } = require("../../models");
const generateEstimatePDF = require("../../utils/generateEstimatePDF");

router.post("/", async (req, res) => {
    try {
        const savedEstimate = await new Estimate(req.body).save();
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

router.put("/:id", async (req, res) => {
    try {
        const updatedEstimate = await Estimate.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true, runValidators: true }
        );

        if (!updatedEstimate) {
            return res.status(404).json({ message: "Estimate not found" });
        }

        res.json({
            message: "Estimate updated successfully",
            estimate: updatedEstimate
        });

    } catch (error) {
        console.error("Error updating estimate:", error);
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

router.get("/:id", async (req, res) => {
    try {
        const estimate = await Estimate.findById(req.params.id);

        if (!estimate) {
            return res.status(404).json({ message: "Estimate not found" });
        }

        res.json(estimate);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

module.exports = router;