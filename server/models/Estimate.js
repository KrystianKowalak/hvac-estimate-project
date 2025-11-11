const mongoose = require("mongoose");

const estimateSchema = new mongoose.Schema(
    {
        customerName: { type: String, required: true },
        customerLocation: { type: String, required: true },
        customerPhone: { type: String },
        customerEmail: { type: String },
        serviceType: { type: String, required: true },
        unitNumber: { type: String, required: true },
        modelNumber: { type: String },
        date: { type: Date, default: Date.now },
        laborHours: { type: Number, default: 1.0 },
        issue: { type: String },
    },
    { timestamps: true }
);

module.exports = mongoose.model("Estimate", estimateSchema);