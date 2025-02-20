const express = require('express');
const router = express.Router();
const { createTravelTip,
    getAllTravelTips,
    getTravelTipById,
    updateTravelTip,
    deleteTravelTip,
    get5TravelTips } = require('../../controllers/TravelTip/TravelTip');

// Routes cho TravelTips
router.post('/create_travel_tip', createTravelTip); // Tạo mới
router.get('/getAll_travel_tip', getAllTravelTips); // Lấy tất cả
router.get('/get_travel-tips/:id', getTravelTipById); // Lấy theo ID
router.put('/update_travel-tips/:id', updateTravelTip); // Cập nhật theo ID
router.delete('/delete_travel-tips/:id', deleteTravelTip); // Xóa theo ID
router.get('/get_5_travel_tip', get5TravelTips); // Lấy tất cả

module.exports = router;
