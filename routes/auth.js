const express = require('express');
const router = express.Router();
const { body, validationResult } = require('express-validator');
const User = require('../models/User');

// Customer Signup
router.post('/customerSignupMethod', [
    body('username').trim().isLength({ min: 3, max: 30 }).withMessage('Username must be 3-30 characters long').matches(/^[A-Za-z0-9_]+$/).withMessage('Username must contain only letters, numbers, and underscores'),
    body('petName').trim().isLength({ min: 2, max: 30 }).withMessage('Pet name must be 2-30 characters long').matches(/^[A-Za-z ]+$/).withMessage('Pet name must contain only letters and spaces'),
    body('petBreed').trim().isLength({ min: 2, max: 30 }).withMessage('Pet breed must be 2-30 characters long').matches(/^[A-Za-z ]+$/).withMessage('Pet breed must contain only letters and spaces'),
    body('password').isLength({ min: 6, max: 50 }).withMessage('Password must be 6-50 characters long'),
    body('confirmpassword').custom((value, { req }) => value === req.body.password).withMessage('Passwords do not match'),
], async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).render('signup', { errorMessage: errors.array().map(e => e.msg).join('<br>') });
    }
    const { username, petName, petBreed, password } = req.body;
    try {
        const existingUser = await User.findOne({ name: username });
        if (existingUser) {
            return res.render('signup', { errorMessage: 'Username already exists. Choose a different username.' });
        }
        const newUser = new User({
            name: username,
            petName: petName,
            petBreed: petBreed,
            password: password,
            role: 'Customer',
        });
        await newUser.save();
        req.session.username = username;
        req.session.role = 'Customer';
        res.redirect('/home');
    } catch (err) {
        console.error('Error during signup:', err);
        res.sendStatus(500);
    }
});

// Trainer Signup
router.post('/trainerSignupMethod', async (req, res) => {
    const { username, password } = req.body;
    try {
        const existingUser = await User.findOne({ name: username });
        if (existingUser) {
            return res.render('signup', { errorMessage: 'Username already exists. Choose a different username.' });
        }
        const newUser = new User({
            name: username,
            password: password,
            role: 'Trainer',
        });
        await newUser.save();
        req.session.username = username;
        req.session.role = 'Trainer';
        res.redirect('/home');
    } catch (err) {
        console.error('Error during signup:', err);
        res.sendStatus(500);
    }
});

// Trainer Login
router.post('/trainerLoginMethod', async (req, res) => {
    const { username, password } = req.body;
    try {
        const user = await User.findOne({ name: username });
        if (!user || user.password !== password) {
            return res.render('trainerlogin', { errorMessage: 'Invalid username or password.' });
        }
        req.session.username = username;
        req.session.role = 'Trainer';
        res.redirect('/home');
    } catch (err) {
        console.error('Error during login:', err);
        res.sendStatus(500);
    }
});

// Customer Login
router.post('/customerLoginMethod', async (req, res) => {
    const { username, password } = req.body;
    try {
        const user = await User.findOne({ name: username });
        if (!user || user.password !== password) {
            return res.render('customerlogin', { errorMessage: 'Invalid username or password.' });
        }
        req.session.username = username;
        req.session.role = 'Customer';
        res.redirect('/home');
    } catch (err) {
        console.error('Error during login:', err);
        res.sendStatus(500);
    }
});

// Logout
router.get('/logout-success', (req, res) => {
    req.session.destroy((err) => {
        res.render('logout-success');
    });
});

module.exports = router; 