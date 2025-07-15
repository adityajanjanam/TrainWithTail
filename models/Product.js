const mongoose = require('mongoose');

const ProductSchema = new mongoose.Schema({
    name: String,
    price: Number,
    quantity: Number,
    total: Number,
    category: String
});

module.exports = mongoose.model('Product', ProductSchema); 