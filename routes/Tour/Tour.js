const express = require('express');
const { getAllTours, createTour, deleteTour, getTourById, updateTour, addReview, top5Tours, getToursByLocation } = require('../../controllers/Tour/Tour');

const router = express.Router();

// Define the route to get all travels
router.get('/getAll_tours', getAllTours);
// Route to create a new travel
router.post('/create_tour', createTour);
// Route to get a travel by ID
router.get('/get_tour_byId/:id', getTourById);
// Route to update a travel by ID
router.put('/update_tour_byId/:id', updateTour);
// Route to delete a travel by ID
router.delete('/delete_tour_byId/:id', deleteTour);
// Route to add a reviews by ID
router.post('/add_review/:id', addReview);
// Route to get_5_tour
router.get('/get_5_tours', top5Tours);
// Route to render travels view
router.get('/tour_ai', getToursByLocation);

module.exports = router;
