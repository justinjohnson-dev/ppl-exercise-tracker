const express = require("express");
const router = express.Router();

// model
const Exercise = require("../../models/exercise");

router.post("/createExercise", (req, res) => {
    let exercise = new Exercise(req.body);
    console.log("exercise");
    console.log(exercise);

    exercise.save()
        .then(item => {
            res.send("item saved to database");
        })
        .catch(err => {
            res.status(400).send("unable to save to database");
        });
});


router.get("/exercise/:id", (req, res) => {
    console.log(req.params.id);
    let exercise = req.params.id;
    console.log(exercise)

    Exercise.find({ workoutID: exercise }).then(exercise => {
        console.log(exercise);
        res.send(exercise);
    });
});

module.exports = router;