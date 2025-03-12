const Booking = require("../../models/Booking/Booking");
require("dotenv").config();

// Hàm gửi email thông báo cho nhân viên
const sendBookingEmail = async (booking) => {
    try {
        const transporter = nodemailer.createTransport({
            service: "gmail",
            auth: {
                user: process.env.EMAIL_USER, // Email nhân viên
                pass: process.env.EMAIL_PASS
            }
        });

        const mailOptions = {
            from: process.env.EMAIL_USER,    // Email nhân viên gửi đi
            to: process.env.EMAIL_USER,      // Nhận email từ chính mình
            replyTo: process.env.EMAIL_USER, // Khi trả lời, email cũng quay về chính họ
            subject: "🛎️ ĐẶT TOUR MỚI!",
            html: `
                <h2>Thông tin đặt tour mới</h2>
                <p><strong>Khách hàng:</strong> ${booking.name} (${booking.email})</p>
                <p><strong>Tour:</strong> ${booking.tourId}</p>
                <p><strong>Ngày khởi hành:</strong> ${booking.startDate}</p>
                <p><strong>Giá:</strong> ${booking.price.toLocaleString()} VND</p>
                <p><strong>Số lượng:</strong> ${booking.quantity} người</p>
            `
        };

        await transporter.sendMail(mailOptions);
        console.log("✅ Email booking đã được gửi cho nhân viên!");
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
