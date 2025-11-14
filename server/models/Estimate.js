const mongoose = require("mongoose");

const estimateSchema = new mongoose.Schema(
    {
        customerName: {
            type: String,
            required: [true, "Customer name is required."]
        },
        customerPhone: {
            type: String,
            validate: {
                validator: function (v) {
                    if (v === "") return true;
                    return /^\(\d{3}\)\s\d{3}-\d{4}$/.test(v);
                },
                message: props => `${props.value} is not a valid phone number. Use format (949) 630-5614.`
            }
        },
        customerEmail: {
            type: String,
            validate: {
                validator: function (v) {
                    return /^\S+@\S+\.\S+$/.test(v);
                },
                message: props => `${props.value} is not a valid email address.`
            },
            required: [true, "Customer email is required."]
        },
        customerAddressStreet: {
            type: String,
            required: [true, "Customer street address is required."]
        },
        customerAddressCityStateZip: {
            type: String,
            required: [true, "Customer city, state, and zip code is required."]
        },
        date: {
            type: Date,
            set: (value) => {
                if (value === "") return undefined;
                return value;
            },
            default: Date.now
        },
        serviceType: {
            type: String,
            required: [true, "Service type is required."]
        },
        servicePrice: {
            type: Number,
            required: [true, "Service price is required."]
        },
        unitType: {
            type: String,
            required: [true, "Unit type is required."]
        },
        unitPrice: {
            type: Number,
            required: [true, "Unit price is required."]
        },
        quantity: {
            type: Number,
            default: 1.0
        },
        modelNumber: {
            type: String
        },
        warrenty: {
            type: Boolean,
        },
        description: {
            type: String
        }
    },
    { timestamps: true }
);

module.exports = mongoose.model("Estimate", estimateSchema);