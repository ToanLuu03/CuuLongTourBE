const express = require('express');
const router = express.Router();
const { createTravelTip,
    getAllTravelTips,
    getTravelTipById,
    updateTravelTip,
    deleteTravelTip } = require('../../controllers/TravelTip/TravelTip');

// Routes cho TravelTips
router.post('/create_travel_tip', createTravelTip); // Tạo mới
router.get('/getAll_travel_tip', getAllTravelTips); // Lấy tất cả
router.get('/get_travel-tips/:id', getTravelTipById); // Lấy theo ID
router.put('/update_travel-tips/:id', updateTravelTip); // Cập nhật theo ID
router.delete('/delete_travel-tips/:id', deleteTravelTip); // Xóa theo ID

module.exports = router;
