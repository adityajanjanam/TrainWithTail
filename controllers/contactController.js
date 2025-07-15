const { body, validationResult } = require('express-validator');
const ContactForm = require('../models/ContactForm');

exports.getContactForm = (req, res) => {
    res.render('ContactForm');
};

exports.postContactForm = [
    body('name').trim().isLength({ min: 2, max: 50 }).withMessage('Name must be 2-50 characters long').matches(/^[A-Za-z ]+$/).withMessage('Name must contain only letters and spaces'),
    body('phone').matches(/^\d{3}-\d{3}-\d{4}$/).withMessage('Phone number must be in the format xxx-xxx-xxxx'),
    body('email').isEmail().withMessage('Invalid email address'),
    body('petname').trim().isLength({ min: 2, max: 30 }).withMessage('Pet name must be 2-30 characters long').matches(/^[A-Za-z ]+$/).withMessage('Pet name must contain only letters and spaces'),
    body('address').trim().isLength({ min: 5, max: 100 }).withMessage('Address must be 5-100 characters long'),
    async (req, res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).render('ContactForm', { errors: errors.array() });
        }
        const { name, phone, email, petname, address } = req.body;
        try {
            const newContactForm = new ContactForm({ name, phone, email, petname, address });
            await newContactForm.save();
            res.redirect('/submittedform');
        } catch (err) {
            console.error('Error saving contact form data:', err);
            res.status(500).render('error', { errorMessage: 'Internal Server Error' });
        }
    }
]; 