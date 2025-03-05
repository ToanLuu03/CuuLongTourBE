const mongoose = require("mongoose");

const bookingSchema = new mongoose.Schema({
    tourId: { type: mongoose.Schema.Types.ObjectId, ref: "Tour", required: true },
    fullName: { type: String, required: true },
    phone: { type: String, required: true },
    email: { type: String, required: true },
    numberOfPeople: { type: Number, required: true },
    status: { type: String, enum: ["pending", "confirmed", "cancelled"], default: "pending" },
    createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model("Booking", bookingSchema);
