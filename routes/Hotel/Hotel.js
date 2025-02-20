const express = require('express');
const { getAllHotels,
    createHotel,
    getHotelById,
    updateHotel,
    deleteHotel,
    top5Hotels } = require('../../controllers/Hotel/Hotel');
const router = express.Router();

router.get('/getAll_hotels', getAllHotels);
router.post('/create_hotels', createHotel);
router.get('/get_hotel_byId/:id', getHotelById);
router.put('/update_hotel/:id', updateHotel);
router.delete('/delete_hotel/:id', deleteHotel);
router.get('/get_5_hotels', top5Hotels);

module.exports = router;
