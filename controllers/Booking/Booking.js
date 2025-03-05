const Booking = require("../../models/Booking/Booking");

// Đặt tour mới
const createBooking = async (req, res) => {
    try {
        const newBooking = new Booking(req.body);
        await newBooking.save();
        res.status(201).json(newBooking);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

// Lấy tất cả booking
const getAllBookings = async (req, res) => {
    try {
        const bookings = await Booking.find().populate("tourId");
        res.status(200).json(bookings);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Lấy booking theo email người dùng
const getBookingsByEmail = async (req, res) => {
    try {
        const { email } = req.params;
        const bookings = await Booking.find({ email }).populate("tourId");
        res.status(200).json(bookings);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

module.exports = { createBooking, getAllBookings, getBookingsByEmail };
