const PDFDocument = require("pdfkit");
const fs = require("fs");
const path = require("path");

function generateEstimatePDF(estimate) {
    return new Promise((resolve, reject) => {
        try {
            const pdfDir = path.join(__dirname, "..", "..", "pdfs");
            const pdfPath = path.join(pdfDir, `estimate_${estimate._id}.pdf`);
            const logoPath = path.join(__dirname, "..", "..", "client", "public", "hvac.png");

            const doc = new PDFDocument();
            const writeStream = fs.createWriteStream(pdfPath);
            doc.pipe(writeStream);

            //helper functions
            const drawRow = (x, y, width, height, color) => {
                doc.save();
                doc.rect(x, y, width, height).fill(color);
                doc.restore();
            };

            const formattedDate = (date) => {
                return date.toLocaleDateString("en-US", {
                    month: "short",
                    day: "2-digit",
                    year: "numeric"
                });
            }

            const addOneMonth = (date) => {
                const dateCopy = new Date(date);
                dateCopy.setMonth(dateCopy.getMonth() + 1);
                return dateCopy;
            };


            //--------------------------------------------------Header--------------------------------------------------
            //logo
            doc.image(logoPath, 50, 20, { width: 100 });

            // Title
            doc.font("Helvetica-Bold")
                .fontSize(22)
                .fillColor("black")
                .text("HVAC Solutions", 0, 55, { width: doc.page.width, align: "center" });
            doc.font("Helvetica")
                .fontSize(10)
                .fillColor("#818181")
                .text("23392 Northwest Suite \#300 | Lake Forest | CA, 92630", 170, 80);
            doc.font("Helvetica")
                .fontSize(10)
                .fillColor("#818181")
                .text("(949) 999-9999 | buisness@gmail.com  | www.companysite.com", 170, 93);
            doc.moveTo(50, 110).lineTo(550, 110).strokeColor("#ff4a2f").stroke();


            //--------------------------------------------------Client Info--------------------------------------------------
            doc.font("Helvetica-Bold")
                .fontSize(12)
                .fillColor("black")
                .text("Recipent:", 50, 130);
            doc.font("Helvetica-Bold")
                .fontSize(16)
                .fillColor("black")
                .text(estimate.customerName, 50, 155);
            doc.font("Helvetica")
                .fontSize(12)
                .fillColor("black")
                .text(estimate.customerPhone);
            doc.font("Helvetica")
                .fontSize(12)
                .fillColor("black")
                .text(estimate.customerEmail);
            doc.font("Helvetica")
                .fontSize(12)
                .fillColor("black")
                .text(estimate.customerAddressStreet);
            doc.font("Helvetica")
                .fontSize(12)
                .fillColor("black")
                .text(estimate.customerAddressCityStateZip);
            doc.moveDown();

            //--------------------------------------------------Invioce Box--------------------------------------------------
            const boxX = 330;
            const boxY = 130;
            const boxWidth = 220;
            const headerHeight = 30;
            const rowHeight = 20;

            //Top Orange Header
            drawRow(boxX, boxY, boxWidth, headerHeight, "#ff4a2f");
            doc.font("Helvetica-Bold")
                .fontSize(12)
                .fillColor("white")
                .text(`Invoice: ${estimate._id}`, boxX + 10, boxY + (headerHeight - 7.14) / 2);

            //Issued Row
            drawRow(boxX, boxY + headerHeight + 0.5, boxWidth, rowHeight, "#EDEDED");
            doc.font("Helvetica")
                .fontSize(10)
                .fillColor("black")
                .text("Issued", boxX + 10, boxY + headerHeight + 7)
                .text(formattedDate(estimate.date), boxX + boxWidth - 70, boxY + headerHeight + 7, { align: "right", width: 60 });

            //Due Row
            drawRow(boxX, boxY + headerHeight + rowHeight + 0.5, boxWidth, rowHeight, "#EDEDED");
            doc.font("Helvetica")
                .fontSize(10)
                .fillColor("black")
                .text("Due", boxX + 10, boxY + headerHeight + rowHeight + 7)
                .text(formattedDate(addOneMonth(estimate.date)), boxX + boxWidth - 70, boxY + headerHeight + rowHeight + 7, { align: "right", width: 60 });

            //Orange Total Row
            drawRow(boxX, boxY + headerHeight + rowHeight * 2 + 0.5, boxWidth, rowHeight, "#ff4a2f");
            doc.font("Helvetica-Bold")
                .fontSize(10)
                .fillColor("white")
                .text("Total", boxX + 10, boxY + headerHeight + rowHeight * 2 + 7)
                .text("$2,609.25", boxX + boxWidth - 70, boxY + headerHeight + rowHeight * 2 + 7, { align: "right", width: 60 });

            //Bottom Gray Balance Row
            drawRow(boxX, boxY + headerHeight + rowHeight * 1.5 + headerHeight + 0.5, boxWidth, rowHeight, "#EDEDED");
            doc.font("Helvetica")
                .fontSize(9)
                .fillColor("gray")
                .text("Account Balance", boxX + 10, boxY + headerHeight + rowHeight * 1.5 + headerHeight + 7)
                .text("$2,609.25", boxX + boxWidth - 70, boxY + headerHeight + rowHeight * 1.5 + headerHeight + 7, { align: "right", width: 60 });
            
            //--------------------------------------------------Service Info--------------------------------------------------
            doc.font("Helvetica-Bold")
                .fontSize(16)
                .fillColor("black")
                .text("For Services Rendered", 50, 300);
            
            drawRow(50, 315, 500, headerHeight, "#ff4a2f");

            //--------------------------------------------------Work In Progress--------------------------------------------------

            // General Info
            doc.x = 50;
            doc.y = 430;
            doc.moveDown();

            // Service Details
            doc.font("Helvetica-Bold").text("Service Details:", { underline: true });
            doc.font("Helvetica").text(`Service Type: ${estimate.serviceType}`);
            doc.text(`Unit Number: ${estimate.unitNumber}`);
            doc.text(`Model Number: ${estimate.modelNumber}`);
            doc.text(`Labor Hours: ${estimate.laborHours}`);
            doc.moveDown();

            // Issue Description
            doc.font("Helvetica-Bold").text("Issue Description:", { underline: true });
            doc.font("Helvetica").text(estimate.issue || "N/A", { indent: 20 });
            doc.moveDown();

            // Footer
            doc.font("Helvetica-Oblique")
                .fontSize(10)
                .text("Generated by HVAC Estimate System", { align: "center" });

            doc.end();

            writeStream.on("finish", () => {
                console.log(`PDF generated at ${pdfPath}`);
                resolve(`/pdfs/estimate_${estimate._id}.pdf`);
            });

            writeStream.on("error", (err) => {
                console.error("Error writing PDF:", err);
                reject(err);
            });
        } catch (error) {
            reject(error);
        }
    });
}

module.exports = generateEstimatePDF;