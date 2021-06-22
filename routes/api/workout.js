const express = require("express");
const router = express.Router();

// user model
const Workout = require("../../models/workout");
const WorkoutLog = require("../../models/workoutLog");

router.post("/createWorkout", (req, res) => {
    let workout = new Workout(req.body);
    console.log("workout");
    console.log(workout);

    workout.save()
        .then(item => {
            res.send("item saved to database");
        })
        .catch(err => {
            res.status(400).send("unable to save to database");
        });
});

router.post("/createLog", (req, res) => {
    let log = new WorkoutLog(req.body);
    console.log("log");
    console.log(log);

    log.save()
        .then(item => {
            res.send("item saved to database");
        })
        .catch(err => {
            res.status(400).send("unable to save to database");
        });
});


router.get("/recentlog/:id", (req, res) => {
    let exercise = req.params.id;

    WorkoutLog.find({ userId: exercise }).then(exercise => {
        let sorted = exercise.sort(function (a, b) {
            return a.timestamp > b.timestamp ? -1 : 1;
        });
        console.log(sorted)
        res.send(exercise);
    });
})

router.get("/getLogs", (req, res) => {
    WorkoutLog.find({}).then(logs => {
        console.log(logs);
        res.send(logs);
    });
});

router.get("/getWorkouts", (req, res) => {
    Workout.find({}).then(workout => {
        console.log(workout);
        res.send(workout);
    });
});


module.exports = router;