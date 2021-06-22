const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const workoutLogSchema = new Schema({
    name: {
        type: String,
        required: true,
    },
    exercises: {
        type: Array,
        required: true
    },
    userId: {
        type: Number,
        required: true
    },
    timestamp: {
        type: Date, default: Date.now
    }
});

module.exports = mongoose.model('workoutlog', workoutLogSchema);