import { useState } from "react";
import "./EstimateForm.css";

function EstimateForm() {
    const [formData, setFormData] = useState({
        customerName: "",
        customerPhone: "",
        customerEmail: "",
        customerAddressStreet: "",
        customerCity: "",
        customerState: "",
        customerZip: "",
        customerAddressCityStateZip: "",
        date: "",
        serviceType: "",
        servicePrice: 0,
        unitType: "",
        unitPrice: 0,
        modelNumber: "",
        quantity: 1,
        warrenty: false,
        description: ""
    });

    const servicePrices = {
        Repair: 250.0,
        Installation: 350.0,
        Maintenance: 200.0
    };

    const unitPrices = {
        "Legacy Unit": 900.0,
        "AC Unit-104": 1200.0,
        "AC Unit-104ST": 1500.0,
        "Furnace-XL90": 1650
    };

    const states = [
        "AL", "AK", "AZ", "AR", "CA", "CO", "CT", "DE", "FL", "GA",
        "HI", "ID", "IL", "IN", "IA", "KS", "KY", "LA", "ME", "MD",
        "MA", "MI", "MN", "MS", "MO", "MT", "NE", "NV", "NH", "NJ",
        "NM", "NY", "NC", "ND", "OH", "OK", "OR", "PA", "RI", "SC",
        "SD", "TN", "TX", "UT", "VT", "VA", "WA", "WV", "WI", "WY"
    ];

    const handleChange = (event) => {
        const { name, value, type, checked } = event.target;
        const newValue = type === "checkbox" ? checked : value;

        setFormData((prev) => {
            const updated = { ...prev, [name]: newValue };

            if (name === "serviceType") {
                updated.servicePrice = servicePrices[value] || 0;
            }

            if (name === "unitType") {
                updated.unitPrice = unitPrices[value] || 0;
            }

            if (["customerCity", "customerState", "customerZip"].includes(name)) {
                updated.customerAddressCityStateZip =
                    `${updated.customerCity}, ${updated.customerState} ${updated.customerZip}`;
            }

            return updated;
        });
    };

    const handleSubmit = async (event) => {
        event.preventDefault();

        try {
            const response = await fetch("http://localhost:5000/api/estimates", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(formData),
            });

            if (!response.ok) throw new Error("Failed request");

            const data = await response.json();
            window.open(`http://localhost:5000${data.pdfFile}`, "_blank");

            setFormData({
                customerName: "",
                customerPhone: "",
                customerEmail: "",
                customerAddressStreet: "",
                customerCity: "",
                customerState: "",
                customerZip: "",
                customerAddressCityStateZip: "",
                date: "",
                serviceType: "",
                servicePrice: 0,
                unitType: "",
                unitPrice: 0,
                modelNumber: "",
                quantity: 1,
                warrenty: false,
                description: ""
            });
        } catch (error) {
            console.error("Submission error:", error);
            alert("Failed to save estimate.");
        }
    };

    return (
        <form className="estimate-form" onSubmit={handleSubmit}>
            <div className="form-row">
                <div className="form-group">
                    <label>Name</label>
                    <input
                        type="text"
                        name="customerName"
                        value={formData.customerName}
                        onChange={handleChange}
                    />
                </div>

                <div className="form-group">
                    <label>Phone</label>
                    <input
                        type="text"
                        name="customerPhone"
                        value={formData.customerPhone}
                        onChange={handleChange}
                    />
                </div>

                <div className="form-group">
                    <label>Email</label>
                    <input
                        type="text"
                        name="customerEmail"
                        value={formData.customerEmail}
                        onChange={handleChange}
                    />
                </div>
            </div>

            <div className="form-row">
                <div className="form-group">
                    <label>Street</label>
                    <input
                        type="text"
                        name="customerAddressStreet"
                        value={formData.customerAddressStreet}
                        onChange={handleChange}
                    />
                </div>

                <div className="form-group">
                    <label>City</label>
                    <input
                        type="text"
                        name="customerCity"
                        value={formData.customerCity}
                        onChange={handleChange}
                    />
                </div>

                <div className="form-group state-field">
                    <label>State</label>
                    <select
                        name="customerState"
                        value={formData.customerState}
                        onChange={handleChange}
                    >
                        <option value="">State</option>
                        {states.map((s) => (
                            <option key={s} value={s}>{s}</option>
                        ))}
                    </select>
                </div>

                <div className="form-group zip-field">
                    <label>ZIP</label>
                    <input
                        type="text"
                        name="customerZip"
                        value={formData.customerZip}
                        onChange={handleChange}
                    />
                </div>

                <div className="form-group">
                    <label>Service Date</label>
                    <input
                        type="date"
                        name="date"
                        value={formData.date}
                        onChange={handleChange}
                    />
                </div>
            </div>

            <div className="form-row">
                <div className="form-group">
                    <label>Service Type</label>
                    <select
                        name="serviceType"
                        value={formData.serviceType}
                        onChange={handleChange}
                    >
                        <option value="">Select service...</option>
                        <option value="Repair">Repair</option>
                        <option value="Installation">Installation</option>
                        <option value="Maintenance">Maintenance</option>
                    </select>
                </div>

                <div className="form-group">
                    <label>Unit Type</label>
                    <select
                        name="unitType"
                        value={formData.unitType}
                        onChange={handleChange}
                    >
                        <option value="">Select a unit...</option>
                        <option value="Legacy Unit">Legacy Unit</option>
                        <option value="AC Unit-104">AC Unit-104</option>
                        <option value="AC Unit-104ST">AC Unit-104ST</option>
                        <option value="Furnace-XL90">Furnace-XL90</option>
                    </select>
                </div>

                <div className="form-group">
                    <label>Model Number</label>
                    <input
                        type="text"
                        name="modelNumber"
                        value={formData.modelNumber}
                        onChange={handleChange}
                    />
                </div>

                <div className="form-group qty-field">
                    <label>Qty</label>
                    <input
                        type="number"
                        name="quantity"
                        min="1"
                        value={Number(formData.quantity)}
                        onChange={handleChange}
                    />
                </div>

                <div className="form-group">
                    <label>Warranty</label>
                    <input
                        type="checkbox"
                        name="warrenty"
                        checked={formData.warrenty}
                        onChange={handleChange}
                    />
                </div>
            </div>

            <div className="form-row">
                <div className="form-group">
                    <label>Issue Description</label>
                    <textarea
                        name="description"
                        rows="4"
                        value={formData.description}
                        onChange={handleChange}
                    ></textarea>
                </div>
            </div>

            <button type="submit">Generate Estimate</button>
        </form>
    );
}

export default EstimateForm;