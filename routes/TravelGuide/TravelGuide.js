const express = require("express");
const router = express.Router();
const { createTravelGuide, getAllTravelGuides, getTravelGuideById, updateTravelGuide, deleteTravelGuide } = require('../../controllers/TravelGuide/TravelGuide');


// 📌 Định nghĩa các API
router.get("/getAll_travelGuide", getAllTravelGuides);
router.post("/create_travelGuide", createTravelGuide);
router.get("/get_travelGuide_byId/:id", getTravelGuideById);
router.put("/update_travelGuide/:id", updateTravelGuide);
router.delete("/delete_travelGuide/:id", deleteTravelGuide);

module.exports = router;
