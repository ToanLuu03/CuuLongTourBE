const mongoose = require("mongoose");
const TravelGuide = require('../../models/TravelGuide/TravelGuide');

// 📌 Tạo hướng dẫn du lịch mới
const createTravelGuide = async (req, res) => {
    try {
        const guide = new TravelGuide(req.body);
        await guide.save();
        res.status(201).json({ success: true, message: "Travel guide created!", data: guide });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

// 📌 Lấy danh sách tất cả hướng dẫn du lịch
const getAllTravelGuides = async (req, res) => {
    try {
        const guides = await TravelGuide.find().populate("author", "name email");
        res.status(200).json({ success: true, data: guides });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

// 📌 Lấy một hướng dẫn du lịch theo ID
const getTravelGuideById = async (req, res) => {
    try {
        const { id } = req.params;

        // Kiểm tra ID có hợp lệ không (ObjectId hợp lệ của MongoDB)
        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(400).json({ success: false, message: "Invalid guide ID" });
        }

        const guide = await TravelGuide.findById(id);
        if (!guide) return res.status(404).json({ success: false, message: "Guide not found" });

        res.status(200).json({ success: true, data: guide });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

// 📌 Cập nhật hướng dẫn du lịch
const updateTravelGuide = async (req, res) => {
    try {
        const { id } = req.params;

        // Kiểm tra ID có hợp lệ không (ObjectId hợp lệ của MongoDB)
        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(400).json({ success: false, message: "Invalid guide ID" });
        }

        const updatedGuide = await TravelGuide.findByIdAndUpdate(id, req.body, { new: true, runValidators: true });
        if (!updatedGuide) return res.status(404).json({ success: false, message: "Guide not found" });

        res.status(200).json({ success: true, message: "Travel guide updated!", data: updatedGuide });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

// 📌 Xóa hướng dẫn du lịch
const deleteTravelGuide = async (req, res) => {
    try {
        const { id } = req.params;

        // Kiểm tra ID có hợp lệ không (ObjectId hợp lệ của MongoDB)
        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(400).json({ success: false, message: "Invalid guide ID" });
        }

        const deletedGuide = await TravelGuide.findByIdAndDelete(id);
        if (!deletedGuide) return res.status(404).json({ success: false, message: "Guide not found" });

        res.status(200).json({ success: true, message: "Travel guide deleted!" });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};
module.exports = { createTravelGuide, getAllTravelGuides, getTravelGuideById, updateTravelGuide, deleteTravelGuide };