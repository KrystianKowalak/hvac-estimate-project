const mongoose = require("mongoose");

const estimateSchema = new mongoose.Schema(
    {
        customerName: {
            type: String, 
            required: [true, "Customer name is required."]
        },
        customerAddressStreet: {
            type: String, 
            required: [true, "Customer street address is required."]
        },
        customerAddressCityStateZip: {
            type: String, 
            required: [true, "Customer city, state, and zip code is required."]
        },
        customerPhone: {
            type: String,
            validate: {
                validator: function(v) {
                    return /^\(\d{3}\)\s\d{3}-\d{4}$/.test(v);
                },
                message: props => `${props.value} is not a valid phone number. Use format (949) 630-5614.`
            }
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
        serviceTypePrice: {
            type: String, 
            required: [true, "Service type price is required."]
        },
        serviceQuantity: {
            type: String, 
            default: 1
        },
        unitType: {
            type: String, 
            required: [true, "Unit type is required."]
        },
        unitTypePrice: {
            type: String, 
            required: [true, "Unit type price is required."]
        },
        unitTypeQuantity: {
            type: String, 
            default: 1.0
        },
        modelNumber: { 
            type: String
        },
        warrenty: {
            type: Boolean,
            required: [true, "If purchasing warrenty is required."]
        },
        description: {
            type: String
        },
        date: {
            type: Date,
            default: Date.now
        }
    },
    { timestamps: true }
);

module.exports = mongoose.model("Estimate", estimateSchema);