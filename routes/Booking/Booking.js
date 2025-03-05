const express = require("express");
const router = express.Router();
const { createBooking, getAllBookings, getBookingsByEmail } = require("../../controllers/Booking/Booking");

router.post("/create_booking", createBooking); // Đặt tour mới
router.get("/get_all/booking", getAllBookings); // Lấy tất cả booking
router.get("/get_booking_by_email/:email", getBookingsByEmail); // Lấy booking theo email

module.exports = router;
