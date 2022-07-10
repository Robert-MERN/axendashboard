const mongoose = require("mongoose");

const passengerSchema = new mongoose.Schema({
    firstName: {
        type: String,
        required: [true, "Please Enter your Firstname!"]
    },
    lastName: {
        type: String,
        required: [true, "Please Enter your Lastname!"]
    },
    email: {
        type: String,
        required: [true, "Please Enter your Email!"],
        unique: [true, "This email is already in used!"]
    },
    passenger: {
        type: String,
    },
    dateAdded: {
        type: Date,
    },
    refrence: {
        type: String,
    },
    departureDate: {
        type: Date,
        required: [true, "Please Enter departureDate!"]
    },
    arrivalDate: {
        type: Date,
        required: [true, "Please Enter arrivalDate!"]
    },
    departureLocation: {
        type: String,
        required: [true, "Please Enter departureLocation!"]
    },
    arrivalLocation: {
        type: String,
        required: [true, "Please Enter arrivalLocation!"]
    },
    airline: {
        type: String,
        required: [true, "Please Enter airline!"]
    },
    class: {
        type: String,
        required: [true, "Please Enter class!"]
    },
    adults: {
        type: Number,
    },
    children: {
        type: Number,
    },
    infants: {
        type: Number,
    },
    status: {
        type: String,
    },
    bookingStatus: {
        type: String,
    },
    paymentStatus: {
        type: String,
    },
    sellingAmount: {
        type: Number,
    },

    ticketPrice: {
        type: Number,
    },
    bookingPrice: {
        type: Number,
    },
}, { timestamps: true });


module.exports = mongoose.model("Passengers", passengerSchema);

