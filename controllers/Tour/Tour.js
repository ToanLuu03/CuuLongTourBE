
const mongoose = require('mongoose');
const Tour = require('../../models/Tour/Tour');

// Controller to get all travel information
const getAllTours = async (req, res) => {
    try {
        const travels = await Tour.find();

        res.status(200).json({
            success: true,
            data: travels,
        });
    } catch (error) {
        console.error('Error fetching Tour information:', error);
        res.status(500).json({
            success: false,
            message: 'Failed to fetch Tour information.',
        });
    }
};
// Controller to create a new travel entry
const createTour = async (req, res) => {
    try {
        const { location, tour, img, price, duration, description, rating, phone, facebook, instagram, reviews } = req.body;

        const newTour = new Tour({
            location,
            tour,
            img,
            price,
            duration,
            description,
            rating,
            phone,
            facebook,
            instagram,
            reviews,
        });

        await newTour.save();

        res.status(201).json({
            success: true,
            message: 'Tour entry created successfully.',
            data: newTour,
        });
    } catch (error) {
        console.error('Error creating Tour entry:', error);
        res.status(500).json({
            success: false,
            message: 'Failed to create Tour entry.',
        });
    }
};
// Controller to get a travel entry by ID
const getTourById = async (req, res) => {
    try {
        const { id } = req.params;

        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(400).json({
                success: false,
                message: 'Invalid ID format.',
            });
        }

        const tour = await Tour.findById(id);

        if (!tour) {
            return res.status(404).json({
                success: false,
                message: 'Tour not found.',
            });
        }

        res.status(200).json({
            success: true,
            data: tour,
        });
    } catch (error) {
        console.error('Error fetching tour entry by ID:', error);
        res.status(500).json({
            success: false,
            message: 'Failed to fetch tour entry.',
        });
    }
};
// Controller to update a travel entry by ID
const updateTour = async (req, res) => {
    try {
        const { id } = req.params;
        const updateData = req.body;

        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(400).json({ message: 'Invalid Tour ID' });
        }

        const updatedTour = await Tour.findByIdAndUpdate(
            id,
            { $set: updateData },
            { new: true, runValidators: true }
        );

        if (!updatedTour) {
            return res.status(404).json({ message: 'Tour not found' });
        }

        res.status(200).json({
            message: 'Tour updated successfully',
            data: updatedTour,
        });
    } catch (error) {
        console.error('Error updating Tour:', error);
        res.status(500).json({
            message: 'Internal server error',
            error: error.message,
        });
    }
};

// Controller to delete a travel entry by ID
const deleteTour = async (req, res) => {
    try {
        const { id } = req.params; // Lấy ID từ params

        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(400).json({ message: 'Invalid Tour ID' });
        }

        const deletedTour = await Tour.findByIdAndDelete(id);

        if (!deletedTour) {
            return res.status(404).json({ message: 'Tour not found' });
        }

        res.status(200).json({
            message: 'Tour deleted successfully',
            data: deletedTour,
        });
    } catch (error) {
        console.error('Error deleting Tour:', error);
        res.status(500).json({
            message: 'Internal server error',
            error: error.message,
        });
    }
};
//Controller to add reviews to the travel
const addReview = async (req, res) => {
    try {
        const { id } = req.params; // Lấy ID từ params
        const { user, comment, rating } = req.body; // Dữ liệu review từ request body
        if (rating < 0 || rating > 5) {
            return res.status(400).json({ message: 'Rating must be between 0 and 5' });
        }
        else if (!user || !comment || rating == null) {
            return res.status(400).json({ message: 'User, comment, and rating are required' });
        }
        else if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(400).json({ message: 'Invalid Tour ID' });
        }
        const addReview = await Tour.findByIdAndUpdate(
            id,
            { $push: { reviews: { user, comment, rating } } },
            { new: true, runValidators: true }
        );
        if (!addReview) {
            return res.status(404).json({ message: 'Travel not found' });
        }
        res.status(200).json({
            message: 'Review added successfully',
            data: addReview,
        });
    } catch (error) {
        console.error('Error deleting Travel:', error);
        res.status(500).json({
            message: 'Internal server error',
            error: error.message,
        });
    }
};
const top5Tours = async (req, res) => {
    try {
        const tours = await Tour.find()
            .limit(5); 

        res.status(200).json({ success: true, data: tours });
    } catch (error) {
        res.status(500).json({ success: false, message: 'Server error', error: error.message });
    }
};
module.exports = { getAllTours, createTour, getTourById, updateTour, deleteTour, addReview, top5Tours };
