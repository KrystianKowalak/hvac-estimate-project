const express = require("express");
const router = express.Router();
const Estimate = require("../models/Estimate");
const fs = require("fs");
const path = require("path");
const PDFDocument = require("pdfkit");

router.post("/", async (req, res) => {
    try {
        const estimate = new Estimate(req.body);
        const savedEstimate = await estimate.save();

        const pdfDir = path.join(__dirname, "..", "..", "pdfs");
        const pdfPath = path.join(pdfDir, `estimate_${savedEstimate._id}.pdf`);

        const doc = new PDFDocument();
        const writeStream = fs.createWriteStream(pdfPath);
        doc.pipe(writeStream);

        doc.fontSize(20).text("HVAC Service Estimate", { align: "center" });
        doc.moveDown();
        doc.fontSize(12).text(`Estimate ID: ${savedEstimate._id}`);
        doc.text(`Date: ${new Date().toLocaleDateString()}`);
        doc.moveDown();
        doc.text(`Customer Name: ${savedEstimate.customerName}`);
        doc.text(`Phone: ${savedEstimate.customerPhone}`);
        doc.text(`Email: ${savedEstimate.customerEmail}`);
        doc.text(`Location: ${savedEstimate.customerLocation}`);
        doc.moveDown();
        doc.text("Issue Description:");
        doc.text(savedEstimate.issue || "N/A", { indent: 20 });
        doc.end();

        writeStream.on("finish", () => {
            console.log(`PDF generated at ${pdfPath}`);
            res.status(201).json({
                message: "Estimate saved and PDF generated successfully",
                pdfFile: `/pdfs/estimate_${savedEstimate._id}.pdf`,
                estimate: savedEstimate,
            });
        });

        writeStream.on("error", (err) => {
            console.error("Error writing PDF:", err);
            res.status(500).json({ message: "Estimate saved, but PDF generation failed." });
        });

    } catch (error) {
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