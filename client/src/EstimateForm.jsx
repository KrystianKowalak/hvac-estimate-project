import { useState } from "react";
import "./EstimateForm.css";

function EstimateForm() {
    const [formData, setFormData] = useState({
        customerName: "",
        customerLocation: "",
        customerPhone: "",
        customerEmail: "",
        serviceType: "",
        unitNumber: "",
        modelNumber: "",
        date: "",
        laborHours: 1.0,
        issue: ""
    });

    const handleChange = (event) => {
        const { name, value } = event.target;
        setFormData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        console.log("Estimate data submitted:", formData);
        alert("Estimate generated successfully!");
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
                    <label htmlFor="customerLocation">Location</label>
                    <input
                        type="text"
                        id="customerLocation"
                        name="customerLocation"
                        value={formData.customerLocation}
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
                    <label htmlFor="issue">Issue Description</label>
                    <textarea
                        id="issue"
                        name="issue"
                        rows="4"
                        value={formData.issue}
                        onChange={handleChange}
                    />
                </div>
            </div>

            <button type="submit">Generate Estimate</button>
        </form>
    );
}

export default EstimateForm;