const express = require('express');
const { getAllTravels, createTravel, getTravelById, updateTravel, deleteTravel } = require('../../controllers/Travel/Travel');
const Travel = require('../../models/Travel/Travel');

const router = express.Router();

// Define the route to get all travels
router.get('/getAll_travels', getAllTravels);
// Route to create a new travel
router.post('/create_travels', createTravel);
// Route to get a travel by ID
router.get('/get_travels_byId/:id', getTravelById);
// Route to update a travel by ID
router.put('/update_travels_byId/:id', updateTravel);
// Route to delete a travel by ID
router.delete('/delete_travels_byId/:id', deleteTravel);
// Route to render travels view
module.exports = router;
