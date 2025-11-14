import { useState } from "react";
import "./EstimateForm.css";

function EstimateForm() {
    const [errors, setErrors] = useState({});
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
    const requiredFields = {
        customerName: "Name",
        customerEmail: "Email",
        customerAddressStreet: "Street",
        customerCity: "City",
        customerState: "State",
        customerZip: "ZIP Code",
        serviceType: "Service Type",
        unitType: "Unit Type"
    };

    const validateForm = () => {
        let newErrors = {};

        for (const field in requiredFields) {
            if (formData[field].trim() === "") {
                newErrors[field] = "Required!";
            }
        }

        if (formData.customerPhone.trim() !== "") {
            if (!/^\(\d{3}\)\s\d{3}-\d{4}$/.test(formData.customerPhone)) {
                newErrors.customerPhone = "Phone must be in format (949) 630-5614.";
            }
        }

        if (formData.customerEmail.trim() !== "") {
            if (!/^\S+@\S+\.\S+$/.test(formData.customerEmail)) {
                newErrors.customerEmail = "Email must be valid.";
            }
        }

        setErrors(newErrors);

        return Object.keys(newErrors).length === 0
    };

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

            setErrors((prev) => {
                if (!prev[name]) return prev;
                const { [name]: _removed, ...rest } = prev;
                return rest;
            });

            return updated;
        });
    };

    const handleSubmit = async (event) => {
        event.preventDefault();

        if (!validateForm()) {
            return;
        }

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
            {Object.keys(errors).length > 0 &&
                <div className="error-text">
                    <div>Please fill all the required fields below.</div>
                    {errors.customerEmail && <div>Email is not valid.</div>}
                    {errors.customerPhone && <div>Phone number is not in the correct format. (XXX) XXX-XXXX</div>}
                </div>
            }
            <div className="form-row">
                <div className="form-group">
                    <label>Name{errors.customerName && <span className="error-text">!!</span>}</label>
                    <input
                        type="text"
                        name="customerName"
                        value={formData.customerName}
                        onChange={handleChange}
                    />
                </div>

                <div className="form-group">
                    <label>Phone{errors.customerPhone && <span className="error-text">!!</span>}</label>
                    <input
                        type="text"
                        name="customerPhone"
                        value={formData.customerPhone}
                        onChange={handleChange}
                    />
                </div>

                <div className="form-group">
                    <label>Email{errors.customerEmail && <span className="error-text">!!</span>}</label>
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
                    <label>Street{errors.customerAddressStreet && <span className="error-text">!!</span>}</label>
                    <input
                        type="text"
                        name="customerAddressStreet"
                        value={formData.customerAddressStreet}
                        onChange={handleChange}
                    />
                </div>

                <div className="form-group">
                    <label>City{errors.customerCity && <span className="error-text">!!</span>}</label>
                    <input
                        type="text"
                        name="customerCity"
                        value={formData.customerCity}
                        onChange={handleChange}
                    />
                </div>

                <div className="form-group state-field">
                    <label>State{errors.customerState && <span className="error-text">!!</span>}</label>
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
                    <label>ZIP{errors.customerZip && <span className="error-text">!!</span>}</label>
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
                    <label>Service Type{errors.serviceType && <span className="error-text">!!</span>}</label>
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
                    <label>Unit Type{errors.unitType && <span className="error-text">!!</span>}</label>
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
            </div>

            <div className="form-row description-header">
                <label>Description</label>

                <label>
                    Purchasing Warranty:
                    <input
                        type="checkbox"
                        name="warrenty"
                        checked={formData.warrenty}
                        onChange={handleChange}
                    />
                </label>
            </div>

            <div className="form-row description-textarea">
                <textarea className="form-group"
                    name="description"
                    rows="4"
                    value={formData.description}
                    onChange={handleChange}
                ></textarea>
            </div>

            <button type="submit">Generate Estimate</button>
        </form>
    );
}

export default EstimateForm;