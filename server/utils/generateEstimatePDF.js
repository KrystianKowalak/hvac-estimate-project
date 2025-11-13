const PDFDocument = require("pdfkit");
const fs = require("fs");
const path = require("path");
const { formattedDate, addOneMonth, wrapDescription } = require("./helperFunctions");

function generateEstimatePDF(estimate) {
    return new Promise((resolve, reject) => {
        try {
            const pdfDir = path.join(__dirname, "..", "..", "pdfs");
            const pdfPath = path.join(pdfDir, `estimate_${estimate._id}.pdf`);
            const logoPath = path.join(__dirname, "..", "..", "client", "public", "hvac.png");

            const doc = new PDFDocument();
            const writeStream = fs.createWriteStream(pdfPath);
            doc.pipe(writeStream);

            //helper function
            const drawRow = (x, y, width, height, color) => {
                doc.save();
                doc.rect(x, y, width, height).fill(color);
                doc.restore();
            };

            let [unitTypeQuantity, unitTypePrice, subTotal, total] = [0, 0, 0, 0]
            if (estimate.serviceType == "Installation") {
                unitTypeQuantity = estimate.unitTypeQuantity
                unitTypePrice = estimate.unitTypePrice

                subTotal = (estimate.serviceTypePrice * estimate.serviceQuantity) + (unitTypeQuantity * unitTypePrice)
            }
            else {
                subTotal = (estimate.serviceTypePrice * estimate.serviceQuantity)
            }
            if (estimate.warrenty) {
                subTotal += 475
            }
            total = subTotal + (subTotal * 0.05)

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
                .fillColor("#686868")
                .text("23392 Northwest Suite \#300 | Lake Forest | CA, 92630", 170, 80);
            doc.font("Helvetica")
                .fontSize(10)
                .fillColor("#686868")
                .text("(949) 999-9999 | buisness@gmail.com  | www.companysite.com", 170, 93);
            doc.strokeColor("#ff4a2f")
                .moveTo(50, 110)
                .lineTo(550, 110)
                .stroke();


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
                .fillColor("#686868")
                .text(estimate.customerPhone);
            doc.font("Helvetica")
                .fontSize(12)
                .fillColor("#686868")
                .text(estimate.customerEmail);
            doc.font("Helvetica")
                .fontSize(12)
                .fillColor("#686868")
                .text(estimate.customerAddressStreet);
            doc.font("Helvetica")
                .fontSize(12)
                .fillColor("#686868")
                .text(estimate.customerAddressCityStateZip);
            doc.moveDown();

            //--------------------------------------------------Invioce Box--------------------------------------------------
            let boxX = 330;
            let boxY = 130;
            let boxWidth = 220;
            let headerHeight = 30;
            let rowHeight = 20;

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
                .fillColor("#303030")
                .text("Issued", boxX + 10, boxY + headerHeight + 7)
                .text(formattedDate(estimate.date), boxX + boxWidth - 70, boxY + headerHeight + 7, { align: "right" });

            //Due Row
            drawRow(boxX, boxY + headerHeight + rowHeight + 0.5, boxWidth, rowHeight, "#EDEDED");
            doc.font("Helvetica")
                .fontSize(10)
                .fillColor("#303030")
                .text("Due", boxX + 10, boxY + headerHeight + rowHeight + 7)
                .text(formattedDate(addOneMonth(estimate.date)), boxX + boxWidth - 70, boxY + headerHeight + rowHeight + 7, { align: "right" });

            //Orange Total Row
            drawRow(boxX, boxY + headerHeight + rowHeight * 2 + 0.5, boxWidth, rowHeight, "#ff4a2f");
            doc.font("Helvetica-Bold")
                .fontSize(10)
                .fillColor("white")
                .text("Total", boxX + 10, boxY + headerHeight + rowHeight * 2 + 7)
                .text(total.toFixed(2), boxX + boxWidth - 70, boxY + headerHeight + rowHeight * 2 + 7, { align: "right" });

            //Bottom Gray Balance Row
            drawRow(boxX, boxY + headerHeight + rowHeight * 1.5 + headerHeight + 0.5, boxWidth, rowHeight, "#EDEDED");
            doc.font("Helvetica")
                .fontSize(9)
                .fillColor("gray")
                .text("Account Balance", boxX + 10, boxY + headerHeight + rowHeight * 1.5 + headerHeight + 7)
                .text(total.toFixed(2), boxX + boxWidth - 70, boxY + headerHeight + rowHeight * 1.5 + headerHeight + 7, { align: "right" });

            //--------------------------------------------------Service Info--------------------------------------------------
            boxX = 50;
            boxY = 315;
            boxWidth = 500;
            headerHeight = 30;
            rowHeight = 20;

            doc.font("Helvetica-Bold")
                .fontSize(16)
                .fillColor("black")
                .text("For Services Rendered", 50, 300);

            //Top Orange Header
            drawRow(boxX, boxY, boxWidth, headerHeight, "#ff4a2f");
            doc.font("Helvetica-Bold")
                .fontSize(12)
                .fillColor("white")
                .text("Product / Service", boxX + 10, boxY + (headerHeight - 7.14) / 2)
                .text("Description", boxX + 129.5, boxY + (headerHeight - 7.14) / 2)
                .text("Qty.", boxWidth - 144.8, boxY + (headerHeight - 7.14) / 2, { align: "right", width: 60 })
                .text("Unit Price", boxWidth - 69, boxY + (headerHeight - 7.14) / 2, { align: "right", width: 60 })
                .text("Total", boxWidth - 19.2, boxY + (headerHeight - 7.14) / 2, { align: "right", width: 60 });

            //Date
            doc.font("Helvetica")
                .fontSize(10)
                .fillColor("#686868")
                .text(formattedDate(estimate.date), boxX + 10, boxY + headerHeight + 7)
            doc.strokeColor("#EDEDED")
                .moveTo(boxX, boxY + headerHeight + rowHeight)
                .lineTo(boxX + boxWidth, boxY + headerHeight + rowHeight)
                .stroke();

            //Service Type
            doc.font("Helvetica")
                .fontSize(10)
                .fillColor("#686868")
                .text(`${estimate.serviceType} and Labor`, boxX + 10, boxY + headerHeight + rowHeight + 7)
                .text("Day rate for technicians and required materials", boxX + 129.5, boxY + headerHeight + rowHeight + 7)
                .text(estimate.serviceQuantity, boxWidth - 144.8, boxY + headerHeight + rowHeight + 7, { align: "right", width: 60 })
                .text(`$${estimate.serviceTypePrice.toFixed(2)}`, boxWidth - 69, boxY + headerHeight + rowHeight + 7, { align: "right", width: 60 })
                .text(`$${(estimate.serviceTypePrice * estimate.serviceQuantity).toFixed(2)}`, boxWidth - 19.2, boxY + headerHeight + rowHeight + 7, { align: "right", width: 60 });
            doc.strokeColor("#EDEDED")
                .moveTo(boxX, boxY + headerHeight + rowHeight * 2)
                .lineTo(boxX + boxWidth, boxY + headerHeight + rowHeight * 2)
                .stroke();

            if (estimate.warrenty) {
                 //Warrenty
                doc.font("Helvetica")
                    .fontSize(10)
                    .fillColor("#686868")
                    .text("One year warrenty", boxX + 10, boxY + headerHeight + rowHeight * 2 + 7)
                    .text("One year of filter exchanges (4 in total), service\ncalls, and support.", boxX + 129.5, boxY + headerHeight + rowHeight * 2 + 7)
                    .text("1", boxWidth - 144.8, boxY + headerHeight + rowHeight * 2 + 7, { align: "right", width: 60 })
                    .text("$475.00", boxWidth - 69, boxY + headerHeight + rowHeight * 2 + 7, { align: "right", width: 60 })
                    .text("$475.00", boxWidth - 19.2, boxY + headerHeight + rowHeight * 2 + 7, { align: "right", width: 60 });
                doc.strokeColor("#EDEDED")
                    .moveTo(boxX, boxY + headerHeight + rowHeight * 3 + 10)
                    .lineTo(boxX + boxWidth, boxY + headerHeight + rowHeight * 3 + 10)
                    .stroke();

                //Description
                const extraRowLines = Math.ceil(estimate.description.length / 47)
                doc.font("Helvetica")
                    .fontSize(10)
                    .fillColor("#686868")
                    .text(`${estimate.unitType} ${estimate.modelNumber}`, boxX + 10, boxY + headerHeight + rowHeight * 3 + 17)
                    .text(wrapDescription(estimate.description, 47), boxX + 129.5, boxY + headerHeight + rowHeight * 3 + 17)
                    .text(unitTypeQuantity, boxWidth - 144.8, boxY + headerHeight + rowHeight * 3 + 17, { align: "right", width: 60 })
                    .text(`$${unitTypePrice.toFixed(2)}`, boxWidth - 69, boxY + headerHeight + rowHeight * 3 + 17, { align: "right", width: 60 })
                    .text(`$${(unitTypePrice * unitTypeQuantity).toFixed(2)}`, boxWidth - 19.2, boxY + headerHeight + rowHeight * 3 + 17, { align: "right", width: 60 });
                doc.strokeColor("#EDEDED")
                    .moveTo(boxX, boxY + headerHeight + rowHeight * 4 + (10 * extraRowLines))
                    .lineTo(boxX + boxWidth, boxY + headerHeight + rowHeight * 4 + (10 * extraRowLines))
                    .stroke();
            }
            else {
                //Description
                const extraRowLines = Math.ceil(estimate.description.length / 47) - 1
                doc.font("Helvetica")
                    .fontSize(10)
                    .fillColor("#686868")
                    .text(`${estimate.unitType} ${estimate.modelNumber}`, boxX + 10, boxY + headerHeight + rowHeight * 2 + 7)
                    .text(wrapDescription(estimate.description, 47), boxX + 129.5, boxY + headerHeight + rowHeight * 2 + 7)
                    .text(estimate.unitTypeQuantity, boxWidth - 144.8, boxY + headerHeight + rowHeight * 2 + 7, { align: "right", width: 60 })
                    .text(`$${estimate.unitTypePrice}`, boxWidth - 69, boxY + headerHeight + rowHeight * 2 + 7, { align: "right", width: 60 })
                    .text(`$${estimate.unitTypePrice}`, boxWidth - 19.2, boxY + headerHeight + rowHeight * 2 + 7, { align: "right", width: 60 });
                doc.strokeColor("#EDEDED")
                    .moveTo(boxX, boxY + headerHeight + rowHeight * 3 + (10 * extraRowLines))
                    .lineTo(boxX + boxWidth, boxY + headerHeight + rowHeight * 3 + (10 * extraRowLines))
                    .stroke();
            }

            //--------------------------------------------------Footer--------------------------------------------------
            boxX = 370;
            boxY = doc.page.height - doc.page.margins.bottom - 62.5;
            boxWidth = 180;
            headerHeight = 30;
            rowHeight = 20;

            //Legal Text
            doc.font("Helvetica")
                .fontSize(8)
                .fillColor("#686868")
                .text("Please note: Payments made 30 days after the deadline are subject to a late fee of\n$15, and another $15 for every day past due.", 50, 625.25)
                .text("Thank you for your buisness. Please contact us with any questions regarding this\ninvoice.", 50, 654.25);

            //Subtotal
            doc.font("Helvetica")
                .fontSize(10)
                .fillColor("#686868")
                .text("Subtotal", boxX + 10, boxY - rowHeight * 3 + 7)
                .text(subTotal.toFixed(2), boxX + 10, boxY - rowHeight * 3 + 7, { align: "right" });

            //Tax
            doc.strokeColor("#EDEDED")
                .moveTo(boxX, boxY - rowHeight * 2)
                .lineTo(boxX + boxWidth, boxY - rowHeight * 2)
                .stroke();
            doc.font("Helvetica")
                .fontSize(10)
                .fillColor("#686868")
                .text("GST (5.0%)", boxX + 10, boxY - rowHeight * 2 + 7)
                .text((subTotal * 0.05).toFixed(2), boxX + 10, boxY - rowHeight * 2 + 7, { align: "right" });

            //Total
            doc.strokeColor("#EDEDED")
                .moveTo(boxX, boxY - rowHeight)
                .lineTo(boxX + boxWidth, boxY - rowHeight)
                .stroke();
            doc.font("Helvetica")
                .fontSize(10)
                .fillColor("#303030")
                .text("Total", boxX + 10, boxY - rowHeight + 7)
                .text(total.toFixed(2), boxX + 10, boxY - rowHeight + 7, { align: "right" });

            //Account Balance
            doc.strokeColor("#EDEDED")
                .moveTo(boxX, boxY)
                .lineTo(boxX + boxWidth, boxY)
                .stroke();
            doc.font("Helvetica")
                .fontSize(10)
                .fillColor("#686868")
                .text("Account balance", boxX + 10, boxY + 7)
                .text(total.toFixed(2), boxX + 10, boxY + 7, { align: "right" });

            //End
            doc.font("Helvetica-Oblique")
                .fontSize(8)
                .fillColor("#686868")
                .text("Generated by HVAC Estimate System", 0, doc.page.height - doc.page.margins.bottom - 12.5, { align: "center" });

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