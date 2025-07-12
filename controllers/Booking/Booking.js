const Booking = require("../../models/Booking/Booking");
require("dotenv").config();
const nodemailer = require("nodemailer"); // Đảm bảo dòng này có trước

const sendBookingEmail = async (booking) => {
    try {
        const populatedBooking = await Booking.findById(booking._id).populate("tourId");

        if (!populatedBooking || !populatedBooking.tourId) {
            console.error("❌ Tour information not found for booking:", booking._id);
            return;
        }

        const { tourId } = populatedBooking;
        const tourName = tourId.tour || "Not specified";
        const tourPrice = tourId.price ? tourId.price.toLocaleString() + " VND" : "Price not available";
        const customerName = booking.fullName || "No name provided";
        const customerEmail = booking.email || "No email provided";
        const customerPhone = booking.phone || "No phone number provided";
        const numberOfPeople = booking.numberOfPeople || 1;

        const transporter = nodemailer.createTransport({
            service: "gmail",
            auth: {
                user: process.env.EMAIL_ADMIN,
                pass: process.env.EMAIL_PASS
            }
        });

        const mailOptions = {
            from: process.env.EMAIL_ADMIN,
            to: [customerEmail, "cuulongvivu@gmail.com"],
            replyTo: process.env.EMAIL_ADMIN,
            subject: "🛎️ Tour Booking Confirmation",
            html: `
                <h2>Tour Booking Details</h2>
                <p><strong>Customer:</strong> ${customerName} (${customerEmail})</p>
                <p><strong>Tour:</strong> ${tourName}</p>
                <p><strong>Price:</strong> ${tourPrice}</p>
                <p><strong>Phone:</strong> ${customerPhone}</p>
                <p><strong>Number of People:</strong> ${numberOfPeople}</p>
                <p>Thank you for booking with us! 🎉</p>
            `
        };

        await transporter.sendMail(mailOptions);
        console.log("✅ Booking email successfully sent to the customer and cuulongvivu@gmail.com!");
    } catch (error) {
        console.error("❌ Failed to send booking email:", error);
    }
};


// Đặt tour mới
const createBooking = async (req, res) => {
    try {
        const newBooking = new Booking(req.body);
        await newBooking.save();
        // Gửi email thông báo cho nhân viên
        await sendBookingEmail(newBooking);
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
