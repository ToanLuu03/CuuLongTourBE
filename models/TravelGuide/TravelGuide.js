const mongoose = require("mongoose");

const TravelGuideSchema = new mongoose.Schema(
    {
        title: { type: String, required: true, trim: true }, // Tiêu đề hướng dẫn
        description: { type: String, required: true }, // Mô tả chung
        destination: { type: String, required: true, trim: true }, // Thành phố/địa điểm
        country: { type: String, required: true, trim: true }, // Quốc gia

        // 🌤 Thời gian du lịch & Thời tiết
        bestTravelTime: { type: String }, // Mùa nào nên đi
        weather: {
            averageTemperature: { type: String }, // Nhiệt độ trung bình
            rainfall: { type: String }, // Lượng mưa trung bình
        },

        // 🌐 Internet & Liên lạc
        internetAndCalling: {
            simCards: [{ type: String }], // Các loại SIM phổ biến
            wifiAvailability: { type: String }, // Mức độ phổ biến của WiFi
            callingTips: { type: String }, // Mẹo gọi điện quốc tế
        },

        // ⚡️ Điện & Ổ cắm
        electricity: {
            voltage: { type: String }, // Điện áp
            plugType: [{ type: String }], // Loại phích cắm
        },

        // 🗣 Ngôn ngữ
        language: {
            officialLanguage: { type: String }, // Ngôn ngữ chính
            commonPhrases: [{ type: String }], // Một số câu giao tiếp cơ bản
        },

        // 🏥 Sức khỏe & An toàn
        healthAndSafety: {
            generalTips: [{ type: String }], // Lưu ý chung về an toàn
            malariaAndMosquitos: { type: String }, // Nguy cơ sốt rét và muỗi
            toilets: { type: String }, // Tình trạng nhà vệ sinh công cộng
            roadSafety: { type: String }, // An toàn giao thông
            tapWater: { type: String }, // Có uống được nước máy không?
            foodSafety: { type: String }, // Lưu ý về an toàn thực phẩm
        },

        // 💰 Tiền & Ngân sách
        moneyAndBudget: {
            vietnameseMoney: { type: String }, // Thông tin về tiền tệ (VND)
            tripCost: { type: String }, // Chi phí trung bình cho chuyến đi
            tipping: { type: String }, // Văn hóa tiền tip
            atms: { type: String }, // Thông tin về ATM
        },

        // 📷 Ảnh & Liên kết
        images: [{ type: String }], // URL hình ảnh
        externalLinks: [{ type: String }], // Link tham khảo

        // ✍️ Thông tin tác giả
        author: { type: String, require: true },
        createdAt: { type: Date, default: Date.now },
        updatedAt: { type: Date, default: Date.now },
    },
    { timestamps: true }
);

const TravelGuide = mongoose.model("TravelGuide", TravelGuideSchema);

module.exports = TravelGuide;
