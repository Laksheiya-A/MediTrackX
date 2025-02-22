const express = require('express');
const router = express.Router();
const { getMedicineDetails } = require('../controllers/medicineController');

// Route to get medicine details by name
router.get('/:name', getMedicineDetails);

module.exports = router;
