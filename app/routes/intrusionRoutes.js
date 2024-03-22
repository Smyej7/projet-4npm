const express = require('express');
const router = express.Router();
const intrusionController = require('../controllers/intrusionController');

// Route pour récupérer toutes les intrusions
router.get('/', intrusionController.getAllIntrusions);

module.exports = router;
