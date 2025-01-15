
const mongoose = require('mongoose');
const Travel = require('../../models/Travel/Travel');

// Controller to get all travel information
const getAllTravels = async (req, res) => {
    try {
        const travels = await Travel.find();

        res.status(200).json({
            success: true,
            data: travels,
        });
    } catch (error) {
        console.error('Error fetching travel information:', error);
        res.status(500).json({
            success: false,
            message: 'Failed to fetch travel information.',
        });
    }
};
// Controller to create a new travel entry
const createTravel = async (req, res) => {
    try {
        const { location, img, description, rating, phone, facebook, instagram, reviews } = req.body;

        const newTravel = new Travel({
            location,
            img,
            description,
            rating,
            phone,
            facebook,
            instagram,
            reviews,
        });

        await newTravel.save();

        res.status(201).json({
            success: true,
            message: 'Travel entry created successfully.',
            data: newTravel,
        });
    } catch (error) {
        console.error('Error creating travel entry:', error);
        res.status(500).json({
            success: false,
            message: 'Failed to create travel entry.',
        });
    }
};
// Controller to get a travel entry by ID
const getTravelById = async (req, res) => {
    try {
        const { id } = req.params;

        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(400).json({
                success: false,
                message: 'Invalid ID format.',
            });
        }

        const travel = await Travel.findById(id);

        if (!travel) {
            return res.status(404).json({
                success: false,
                message: 'Travel not found.',
            });
        }

        res.status(200).json({
            success: true,
            data: travel,
        });
    } catch (error) {
        console.error('Error fetching travel entry by ID:', error);
        res.status(500).json({
            success: false,
            message: 'Failed to fetch travel entry.',
        });
    }
};
// Controller to update a travel entry by ID
const updateTravel = async (req, res) => {
    try {
        const { id } = req.params; 
        const updateData = req.body; 

        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(400).json({ message: 'Invalid Travel ID' });
        }

        const updatedTravel = await Travel.findByIdAndUpdate(
            id,
            { $set: updateData }, 
            { new: true, runValidators: true } 
        );

        if (!updatedTravel) {
            return res.status(404).json({ message: 'Travel not found' });
        }

        res.status(200).json({
            message: 'Travel updated successfully',
            data: updatedTravel,
        });
    } catch (error) {
        console.error('Error updating Travel:', error);
        res.status(500).json({
            message: 'Internal server error',
            error: error.message,
        });
    }
};
// Controller to delete a travel entry by ID
const deleteTravel = async (req, res) => {
    try {
        const { id } = req.params; // Lấy ID từ params

        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(400).json({ message: 'Invalid Travel ID' });
        }

        const deletedTravel = await Travel.findByIdAndDelete(id);

        if (!deletedTravel) {
            return res.status(404).json({ message: 'Travel not found' });
        }

        res.status(200).json({
            message: 'Travel deleted successfully',
            data: deletedTravel,
        });
    } catch (error) {
        console.error('Error deleting Travel:', error);
        res.status(500).json({
            message: 'Internal server error',
            error: error.message,
        });
    }
};
module.exports = { getAllTravels, createTravel, getTravelById, updateTravel, deleteTravel };
