const TravelTip = require('../../models/TravelTip/TravelTip');

// Tạo TravelTip mới
const createTravelTip = async (req, res) => {
    try {
        const { content } = req.body;

        // Kiểm tra và đảm bảo content hợp lệ
        if (content && Array.isArray(content)) {
            content.forEach(item => {
                if (item.type === 'text' || item.type === 'mixed') {
                    if (!Array.isArray(item.text)) {
                        item.text = item.text ? [item.text] : [];
                    }
                    if (!item.textTitle) {
                        throw new Error('textTitle is required for text and mixed types');
                    }
                }
            });
        }

        const travelTip = new TravelTip(req.body);
        await travelTip.save();
        res.status(200).json({
            success: true,
            data: travelTip,
        });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

// Lấy danh sách TravelTips
const getAllTravelTips = async (req, res) => {
    try {
        const travelTips = await TravelTip.find();
        res.status(200).json({
            success: true,
            data: travelTips,
        });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Lấy một TravelTip theo ID
const getTravelTipById = async (req, res) => {
    try {
        const travelTip = await TravelTip.findById(req.params.id);
        if (!travelTip) {
            return res.status(404).json({ message: 'TravelTip not found' });
        }
        res.status(200).json({
            success: true,
            data: travelTip,
        });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Cập nhật TravelTip theo ID
const updateTravelTip = async (req, res) => {
    try {
        const { content } = req.body;

        // Kiểm tra content nếu có
        if (content && Array.isArray(content)) {
            content.forEach(item => {
                if (item.type === 'text' || item.type === 'mixed') {
                    if (!Array.isArray(item.text)) {
                        item.text = item.text ? [item.text] : [];
                    }
                    if (!item.textTitle) {
                        throw new Error('textTitle is required for text and mixed types');
                    }
                }
            });
        }

        const travelTip = await TravelTip.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!travelTip) {
            return res.status(404).json({ message: 'TravelTip not found' });
        }
        res.status(200).json({
            success: true,
            data: travelTip,
        });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

// Xóa TravelTip theo ID
const deleteTravelTip = async (req, res) => {
    try {
        const travelTip = await TravelTip.findByIdAndDelete(req.params.id);
        if (!travelTip) {
            return res.status(404).json({ message: 'TravelTip not found' });
        }
        res.status(200).json({
            success: true,
            message: 'TravelTip deleted'
        });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

module.exports = {
    createTravelTip,
    getAllTravelTips,
    getTravelTipById,
    updateTravelTip,
    deleteTravelTip
};
