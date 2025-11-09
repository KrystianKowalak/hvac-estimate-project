import { useState } from "react";
import "./EstimateForm.css";

function EstimateForm() {
    const [formData, setFormData] = useState({
        unitNumber: "",
        modelNumber: "",
        location: "",
        issue: "",
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

            <label htmlFor="modelNumber">Model Number</label>
            <input
                type="text"
                id="modelNumber"
                name="modelNumber"
                value={formData.modelNumber}
                onChange={handleChange}
            />

            <label htmlFor="location">Location</label>
            <input
                type="text"
                id="location"
                name="location"
                value={formData.location}
                onChange={handleChange}
            />

            <label htmlFor="issue">Issue Description</label>
            <textarea
                id="issue"
                name="issue"
                rows="4"
                value={formData.issue}
                onChange={handleChange}
            />

            <button type="submit">Generate Estimate</button>
        </form>
    );
}

export default EstimateForm;