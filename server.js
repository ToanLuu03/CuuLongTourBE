const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const connectDB = require('./config/db');
const travelRoutes = require('./routes/Travel/Travel');
const hotelRoutes = require('./routes/Hotel/Hotel');

dotenv.config();
connectDB();

const app = express(); // Initialize the app


// Middleware
app.use(cors());
app.use(express.json());

// Use the travel routes
app.use('/api', travelRoutes, hotelRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
