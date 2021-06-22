const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const workoutLogSchema = new Schema({
    name: {
        type: String,
        required: true,
        unique: true
    },
    id: {
        type: Number,
        required: true,
        unique: true
    },
    exercises: {
        type: Object,
        required: true
    },
    userId: {
        type: Number,
        required: true
    }
});

module.exports = mongoose.model('workout-log', workoutLogSchema);