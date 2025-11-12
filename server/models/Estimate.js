const mongoose = require("mongoose");

const estimateSchema = new mongoose.Schema(
    {
        customerName: {
            type: String, 
            required: [true, "Customer name is required."]
        },
        customerLocation: {
            type: String, 
            required: [true, "Customer location is required."]
        },
        customerPhone: {
            type: String,
            validate: {
                validator: function(v) {
                    return /^\(\d{3}\)\s\d{3}-\d{4}$/.test(v);
                },
                message: props => `${props.value} is not a valid phone number. Use format (949) 630-5614.`
            },
            required: [true, "Customer phone number is required."]
        },
        customerEmail: {
            type: String,
            validate: {
                validator: function(v) {
                    return /^\S+@\S+\.\S+$/.test(v);
                },
                message: props => `${props.value} is not a valid email address.`
            },
            required: [true, "Customer email is required."]
        },
        serviceType: {
            type: String, 
            required: [true, "Service type is required."]
        },
        unitNumber: {
            type: String, 
            required: [true, "Unit number is required."]
        },
        modelNumber: { 
            type: String
        },
        date: {
            type: Date,
            default: Date.now
        },
        laborHours: {
            type: Number,
            default: 1.0
        },
        issue: {
            type: String
        },
    },
    { timestamps: true }
);

module.exports = mongoose.model("Estimate", estimateSchema);