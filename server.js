const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const connectDB = require('./config/db');
const tourRoutes = require('./routes/Tour/Tour');
const hotelRoutes = require('./routes/Hotel/Hotel');
const travelTipRoutes = require('./routes/TravelTip/TravelTip');
const specialtyRoutes = require('./routes/Specialty/Specialty')
const bookingRoutes = require('./routes/Booking/Booking')

dotenv.config();
connectDB();

const app = express(); // Initialize the app


// Middleware
app.use(cors());
app.use(express.json());

// Use the travel routes
app.use('/api', tourRoutes, hotelRoutes, travelTipRoutes, specialtyRoutes, bookingRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
