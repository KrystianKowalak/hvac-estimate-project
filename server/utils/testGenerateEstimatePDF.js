const path = require("path");
const generateEstimatePDF = require("./generateEstimatePDF");

const mockEstimate = {
    _id: "mock12345",
    customerName: "Nicole Santos",
    customerAddressStreet: "26571 Normadale Dr.",
    customerAddressCityStateZip: "Lake Forest, CA 92630",
    customerPhone: "(949) 630-5614",
    customerEmail: "nicole.santos@email.com",
    serviceType: "Repair",
    serviceTypePrice: 450.00,
    serviceQuantity: 1,
    unitType: "Furnace-XL90",
    unitTypePrice: 1560.00,
    unitTypeQuantity: 1,
    modelNumber: "AVX-450",
    warrenty: true,
    description: "Furnace blowing cold air, thermostat unresponsive.",
    date: new Date()
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