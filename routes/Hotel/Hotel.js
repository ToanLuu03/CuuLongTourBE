const express = require('express');
const { getAllHotels, createHotel, getHotelById } = require('../../controllers/Hotel/Hotel');
const router = express.Router();

router.get('/getAll_hotels', getAllHotels);
router.post('/create_hotels', createHotel);
router.get('/get_hotel_byId/:id', getHotelById);

module.exports = router;
