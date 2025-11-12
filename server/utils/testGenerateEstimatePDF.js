const path = require("path");
const generateEstimatePDF = require("./generateEstimatePDF");

const mockEstimate = {
    _id: "mock12345",
    customerName: "Nicole Santos",
    customerAddressStreet: "26571 Normadale Dr.",
    customerAddressCityStateZip: "Lake Forest, CA 92630",
    customerPhone: "(949) 630-5614",
    customerEmail: "nicole.santos@email.com",
    serviceType: "Maintenance",
    unitNumber: "Furnace-XL900",
    modelNumber: "AVX-4500",
    laborHours: 2.5,
    issue: "Furnace blowing cold air, thermostat unresponsive.",
    date: new Date(),
};

(async () => {
    try {
        console.log("Generating test PDF...");
        await generateEstimatePDF(mockEstimate);
        console.log("PDF generated successfully!");
    } catch (err) {
        console.error("PDF generation failed:", err);
    }
})();