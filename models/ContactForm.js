const mongoose = require('mongoose');

const ContactFormSchema = new mongoose.Schema({
    name: String,
    phone: String,
    email: String,
    petname: String,
    address: String
});

module.exports = mongoose.model('ContactForm', ContactFormSchema); 