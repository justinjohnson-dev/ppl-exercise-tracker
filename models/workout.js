const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const workoutSchema = new Schema({
    name: {
        type: String,
        required: true,
        unique: true
    },
    exercises: {
        type: Array,
    },
    sets: {
        type: Array,
    },
    reps: {
        type: Array
    }
});

module.exports = mongoose.model('workout', workoutSchema);