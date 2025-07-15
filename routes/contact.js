const express = require('express');
const router = express.Router();
const contactController = require('../controllers/contactController');

router.get('/ContactForm', contactController.getContactForm);
router.post('/ContactForm', contactController.postContactForm);

module.exports = router; 