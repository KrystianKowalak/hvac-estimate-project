import { useState } from "react";
import "./EstimateForm.css";

function EstimateForm() {
    const [formData, setFormData] = useState({
        customerName: "",
        customerAddress: "",
        customerCityStateZip: "",
        customerPhone: "",
        customerEmail: "",
        serviceType: "",
        servicePrice: 0,
        serviceQuantity: 0,
        unitType: "",
        unitPrice: 0,
        unitQuantity: 0,
        modelNumber: "",
        warrenty: false,
        description: "",
        date: "",
        laborHours: 1.0
    });

    const handleChange = (event) => {
        const { name, value } = event.target;
        setFormData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    };

    const handleSubmit = async (event) => {
        event.preventDefault();

        try {
            const response = await fetch("http://localhost:5000/api/estimates", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(formData),
            });

            if (!response.ok) {
                throw new Error("Network response was not ok");
            }

            const data = await response.json();
            alert("Estimate saved successfully!");

            setFormData({
                customerName: "",
                customerAddress: "",
                customerCityStateZip: "",
                customerPhone: "",
                customerEmail: "",
                serviceType: "",
                servicePrice: 0,
                serviceQuantity: 0,
                unitType: "",
                unitPrice: 0,
                unitQuantity: 0,
                modelNumber: "",
                warrenty: false,
                description: "",
                date: "",
                laborHours: 1.0
            });
        } catch (error) {
            console.error("Error saving estimate:", error);
            alert("Failed to save estimate. Check console for details.");
        }
    };

    return (
        <form className="estimate-form" onSubmit={handleSubmit}>
            <div className="form-row">
                <div className="form-group">
                    <label htmlFor="customerName">Name</label>
                    <input
                        type="text"
                        id="customerName"
                        name="customerName"
                        value={formData.customerName}
                        onChange={handleChange}
                    />
                </div>

                <div className="form-group">
                    <label htmlFor="customerAddress">Location</label>
                    <input
                        type="text"
                        id="customerAddress"
                        name="customerAddress"
                        value={formData.customerAddress}
                        onChange={handleChange}
                    />
                </div>
            </div>

            <div className="form-row">
                <div className="form-group">
                    <label htmlFor="customerPhone">Phone</label>
                    <input
                        type="text"
                        id="customerPhone"
                        name="customerPhone"
                        value={formData.customerPhone}
                        onChange={handleChange}
                    />
                </div>

                <div className="form-group">
                    <label htmlFor="customerEmail">Email</label>
                    <input
                        type="text"
                        id="customerEmail"
                        name="customerEmail"
                        value={formData.customerEmail}
                        onChange={handleChange}
                    />
                </div>
            </div>

            <div className="form-row">
                <div className="form-group">
                    <label htmlFor="serviceType">Service type</label>
                    <select
                        id="serviceType"
                        name="serviceType"
                        value={formData.serviceType}
                        onChange={handleChange}
                    >
                        <option value="">Select a service...</option>
                        <option value="Repair">Repair</option>
                        <option value="Installation">Installation</option>
                        <option value="Maintenance">Maintenance</option>
                        <option value="Other">Other</option>
                    </select>
                </div>

                <div className="form-group">
                    <label htmlFor="unitNumber">Unit Number</label>
                    <select
                        id="unitNumber"
                        name="unitNumber"
                        value={formData.unitNumber}
                        onChange={handleChange}
                    >
                        <option value="">Select a unit...</option>
                        <option value="Legacy Unit">Legacy Unit</option>
                        <option value="AC Unit - 104">AC Unit - 104</option>
                        <option value="AC Unit - 104ST">AC Unit - 104ST</option>
                        <option value="Other">Other</option>
                    </select>
                </div>
            </div>

            <div className="form-row three-columns">
                <div className="form-group">
                    <label htmlFor="modelNumber">Model Number</label>
                    <input
                        type="text"
                        id="modelNumber"
                        name="modelNumber"
                        value={formData.modelNumber}
                        onChange={handleChange}
                    />
                </div>

                <div className="form-group">
                    <label htmlFor="date">Service Date</label>
                    <input
                        type="date"
                        id="date"
                        name="date"
                        value={formData.date}
                        onChange={handleChange}
                    />
                </div>

                <div className="form-group">
                    <label htmlFor="laborHours">Labor Hours</label>
                    <input
                        type="number"
                        id="laborHours"
                        name="laborHours"
                        value={formData.laborHours}
                        onChange={handleChange}
                        min="0"
                        step="0.5"
                    />
                </div>
            </div>

            <div className="form-row">
                <div className="form-group">
                    <label htmlFor="description">Issue Description</label>
                    <textarea
                        id="description"
                        name="description"
                        rows="4"
                        value={formData.description}
                        onChange={handleChange}
                    />
                </div>
            </div>

            <button type="submit">Generate Estimate</button>
        </form>
    );
}

export default EstimateForm;