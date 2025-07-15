const mongoose = require('mongoose');

const BehaviorSchema = new mongoose.Schema({
    behaviorName: String,
    behaviorImg: String,
    behaviorDesc: String,
    behaviorObj: String,
    behaviorTech: String,
    progress: String,
    comments: String,
    behaviorUser: String,
    behaviorPet: String
});

module.exports = mongoose.model('Behavior', BehaviorSchema); 