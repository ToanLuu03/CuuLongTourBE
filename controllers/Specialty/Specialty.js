const Specialty = require('../../models/Specialty/Specialty');

// Tạo Specialty mới
const createSpecialty = async (req, res) => {
    try {
        const specialty = new Specialty(req.body);
        await specialty.save();
        res.status(200).json({
            success: true,
            data: specialty,
        });
    } catch (error) {
        console.error('Error creating specialty:', error.message);
        res.status(400).json({ error: 'Error creating specialty. Please check the input data.' });
    }
};

// Lấy tất cả Specialty
const getAllSpecialties = async (req, res) => {
    try {
        const specialties = await Specialty.find();
        res.status(200).json({
            success: true,
            data: specialties,
        });
    } catch (error) {
        console.error('Error fetching specialties:', error.message);
        res.status(500).json({ error: 'Server error. Please try again later.' });
    }
};

// Lấy Specialty theo ID
const getSpecialtyById = async (req, res) => {
    try {
        const specialty = await Specialty.findById(req.params.id);
        if (!specialty) return res.status(404).json({ error: 'Specialty not found' });
        res.status(200).json({
            success: true,
            data: specialty,
        });
    } catch (error) {
        console.error('Error fetching specialty:', error.message);
        res.status(500).json({ error: 'Server error. Please try again later.' });
    }
};

// Cập nhật Specialty theo ID
const updateSpecialty = async (req, res) => {
    try {
        const specialty = await Specialty.findByIdAndUpdate(req.params.id, req.body, {
            new: true,
            runValidators: true
        });
        if (!specialty) return res.status(404).json({ error: 'Specialty not found' });
        res.status(200).json({
            success: true,
            data: specialty,
        });
    } catch (error) {
        console.error('Error updating specialty:', error.message);
        res.status(400).json({ error: 'Error updating specialty. Please check the input data.' });
    }
};

// Xóa Specialty theo ID
const deleteSpecialty = async (req, res) => {
    try {
        const specialty = await Specialty.findByIdAndDelete(req.params.id);
        if (!specialty) return res.status(404).json({ error: 'Specialty not found' });
        res.status(200).json({
            success: true,
            message: 'Specialty deleted successfully',
        });
    } catch (error) {
        console.error('Error deleting specialty:', error.message);
        res.status(500).json({ error: 'Server error. Please try again later.' });
    }
};

module.exports = { createSpecialty, getAllSpecialties, getSpecialtyById, updateSpecialty, deleteSpecialty };
