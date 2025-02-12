const express = require('express');
const router = express.Router();
const { createSpecialty, getAllSpecialties, getSpecialtyById, updateSpecialty, deleteSpecialty } = require('../../controllers/Specialty/Specialty');

router.post('/create_specialty', createSpecialty);
router.get('/getAll_specialty', getAllSpecialties);
router.get('/getAll_specialty_byId/:id', getSpecialtyById);
router.put('/update_specialty_byId/:id', updateSpecialty);
router.delete('/delete_specialty_byId/:id', deleteSpecialty);

module.exports = router;
