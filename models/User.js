const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
    name: String,
    petName: String,
    petBreed: String,
    password: String,
    role: String
});

module.exports = mongoose.model('User', UserSchema); 