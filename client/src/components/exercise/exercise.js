import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import axios from 'axios';
import { Button, responsiveFontSizes } from '@material-ui/core';


const useStyles = makeStyles((theme) => ({
    root: {
        '& > *': {
            margin: theme.spacing(1),
        },
    },
    center: {
        textAlign: 'center'
    },
    button: {
        margin: '2%'
    },
    saveButton: {
        marginLeft: '4%',
        marginTop: '3%'
    },
    saveButtonColor: {
        marginLeft: '4%',
        marginTop: '3%',
        backgroundColor: 'green'
    },
    flexbox: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'column'
    },
    textFieldName: {
        width: '220px',
        fontSize: '5px'
    },
    textFieldProperties: {
        width: '75px'
    },
    lastWeekLog: {
        marginLeft: '2%',
        width: '50px'
    },
    exerciseLog: {
        marginBottom: '10%'
    },
    marginTop: {
        marginTop: "5%"
    }
}));

export default function Exercise(props) {
    const classes = useStyles();
    const [user, setUser] = useState("");
    const [exercises, setExercises] = useState([]);
    const [reps, setReps] = useState("");
    const [saveStatus, setSavedStatus] = useState(false);
    const [weight, setWeight] = useState("");
    const [workout, setWorkout] = useState([]);
    const [lastWeekLog, setLastWeekLog] = useState([]);

    let workoutLog = [];
    let counter = 0;

    // Similar to componentDidMount and componentDidUpdate:
    useEffect(() => {
        const fetchData = async () => {
            const exercise = await axios(
                `/api/v1/exercise/${props.location.state.id}`
            );
            const workoutLogs = await axios(
                `/api/v1/recentlog/${props.location.state.userId}`
            );
            setExercises(exercise.data);
            setUser(props.location.state.name);

            // breaking foreach after first match is found
            var BreakException = {};
            try {
                workoutLogs.data.forEach(function (log) {
                    if (log.name == props.location.state.exercise) {
                        console.log('match')
                        setLastWeekLog(log);
                        throw BreakException;
                    }
                });
            } catch (e) {
                if (e !== BreakException) throw e;
            }
        };

        fetchData();
    }, []);

    function saveData(exercise, set, weight, reps) {
        setSavedStatus(true);

        workoutLog.push({
            name: exercise,
            data: {
                set: set,
                weight: weight,
                reps: reps
            }
        });

        // creating temp array to 
        // append to state
        let myArr = [...workout]
        myArr.push(workoutLog)
        setWorkout(myArr)

        setTimeout(() => {
            setSavedStatus(false)
        }, 1000);
    }

    function submitWorkoutLog() {
        console.log(workout)
        let usersId = null;

        axios.get(`/api/v1/getUsers`)
            .then(res => {
                res.data.map((users) => {
                    if (user == users.name) {
                        usersId = users.id;
                    }
                });

                let completedWorkoutLog = {
                    name: props.location.state.exercise,
                    exercises: workout,
                    userId: usersId
                }

                axios.post(`/api/v1/createLog`, completedWorkoutLog)
                    .then(res => {
                        console.log(res)
                    })

                props.history.push({
                    pathname: '/',
                    state: {},
                });
            })
    }

    return (
        <div className={classes.root}>
            <h1 className={classes.center}>Todays Workout</h1>
            <div className={classes.flexbox}>
                {exercises.length != 0 && exercises.map(item => {
                    let setSize = [];
                    for (let i = 1; i < parseInt(item.sets) + 1; i++) {
                        setSize.push(i)
                    }

                    return <div className={classes.exerciseLog} key={item.id}>
                        <h2>Exercise {counter += 1}</h2>
                        <TextField className={classes.textFieldName} label="Exercise" defaultValue={item.name} />
                        <TextField className={classes.textFieldProperties} label="Sets" defaultValue={item.sets} />
                        <TextField className={classes.textFieldProperties} label="Reps" defaultValue={item.reps} />

                        {setSize.map(set => {
                            return <div className={classes.marginTop} key={set.id}>
                                <TextField className={classes.textFieldProperties} label="Set" defaultValue={set} />
                                <TextField className={classes.textFieldProperties} onChange={e => setWeight(e.target.value)} label="Weight" />
                                <TextField className={classes.textFieldProperties} onChange={e => setReps(e.target.value)} label="Reps" />
                                {saveStatus == false &&
                                    <Button className={classes.saveButton} onClick={() => saveData(item.name, set, weight, reps)} variant="contained" color="primary" >Save</Button>
                                }
                                {saveStatus == true &&
                                    <Button className={classes.saveButtonColor} onClick={() => saveData(item.name, set, weight, reps)} variant="contained" color="primary" >Save</Button>
                                }
                                <TextField className={classes.lastWeekLog} label="LW" defaultValue={"e.g"} />

                            </div>
                        })
                        }
                    </div>
                })}
                {exercises.length == 0 &&
                    <div>Loading...</div>
                }
            </div>
            <div className={classes.center}>
                <Button className={classes.button} onClick={() => submitWorkoutLog()} variant="contained" color="primary">Complete Workout</Button>
            </div>
        </div >
    );
}