const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const exerciseSchema = new Schema({
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
    reps: {
        type: String,
        required: true
    },
    sets: {
        type: String,
        required: true
    },
    workoutID: {
        type: Number,
        required: true
    }
});

module.exports = mongoose.model('exercise', exerciseSchema);