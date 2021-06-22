import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import axios from 'axios';


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
    let counter = 0;

    // Similar to componentDidMount and componentDidUpdate:
    useEffect(() => {
        axios.get(`/api/v1/exercise/${props.location.state.exercise}`)
            .then(response =>
                setExercises(response.data),
                setUser(props.location.state.name)
            );
    }, []);

    return (
        <div className={classes.root}>
            <h1 className={classes.center}>Todays Workout</h1>
            <div className={classes.flexbox}>
                {exercises.length != 0 && exercises.map(item => {
                    let setSize = [];
                    for (let i = 1; i < parseInt(item.sets) + 1; i++) {
                        setSize.push(i)
                    }
                    return <div className={classes.exerciseLog}>
                        <h2>Exercise {counter += 1}</h2>
                        <TextField className={classes.textFieldName} id="standard-required" label="Exercise" defaultValue={item.name} />
                        <TextField className={classes.textFieldProperties} id="standard-required" label="Sets" defaultValue={item.sets} />
                        <TextField className={classes.textFieldProperties} id="standard-required" label="Reps" defaultValue={item.reps} />

                        {setSize.map(set => {
                            return <div className={classes.marginTop}>
                                <TextField className={classes.textFieldProperties} id="standard-required" label="Set" defaultValue={set} />
                                <TextField className={classes.textFieldProperties} id="standard-required" label="Weight" />
                                <TextField className={classes.textFieldProperties} id="standard-required" label="Reps" />
                            </div>
                        })
                        }
                    </div>
                })}
                {exercises.length == 0 &&
                    <div>Loading...</div>
                }
            </div>
        </div >
    );
}