const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const workoutSchema = new Schema({
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
        type: Array,
        required: true
    }
});

module.exports = mongoose.model('workout', workoutSchema);