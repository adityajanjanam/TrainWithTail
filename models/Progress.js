const mongoose = require('mongoose');

const ProgressSchema = new mongoose.Schema({
    progressDay: String,
    comments: String,
    progressUser: String,
    progressPet: String,
    progressVideo: String
});

module.exports = mongoose.model('Progress', ProgressSchema); 