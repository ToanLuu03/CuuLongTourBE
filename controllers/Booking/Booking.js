const Booking = require("../../models/Booking/Booking");
require("dotenv").config();
const nodemailer = require("nodemailer"); // Đảm bảo dòng này có trước

const sendBookingEmail = async (booking) => {
    try {
        const populatedBooking = await Booking.findById(booking._id).populate("tourId");

        if (!populatedBooking || !populatedBooking.tourId) {
            console.error("❌ Không tìm thấy thông tin tour cho booking:", booking._id);
            return;
        }

        const { tourId } = populatedBooking;
        const tourName = tourId.tour || "Chưa xác định";
        const tourPrice = tourId.price ? tourId.price.toLocaleString() + " VND" : "Chưa có giá";
        const customerName = booking.fullName || "Không có tên";
        const customerEmail = booking.email || "Không có email";
        const customerPhone = booking.phone || "Không có số điện thoại";
        const numberOfPeople = booking.numberOfPeople || 1; // Mặc định 1 nếu không có giá trị

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
            subject: "🛎️ Xác nhận đặt tour",
            html: `
                <h2>Thông tin đặt tour</h2>
                <p><strong>Khách hàng:</strong> ${customerName} (${customerEmail})</p>
                <p><strong>Tour:</strong> ${tourName}</p>
                <p><strong>Giá:</strong> ${tourPrice}</p>
                <p><strong>Số điện thoại:</strong> ${customerPhone}</p>
                <p><strong>Số lượng người:</strong> ${numberOfPeople} người</p>
                <p>Cảm ơn bạn đã đặt tour với chúng tôi! 🎉</p>
            `
        };

        await transporter.sendMail(mailOptions);
        console.log("✅ Email booking đã được gửi tới khách hàng và cuulongvivu@gmail.com!");
    } catch (error) {
        console.error("❌ Lỗi gửi email:", error);
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
