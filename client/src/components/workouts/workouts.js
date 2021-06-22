import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
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
    }
}));

export default function Workouts(props) {
    const classes = useStyles();
    const [user, setUser] = useState("");
    const [workouts, setWorkouts] = useState([]);

    // Similar to componentDidMount and componentDidUpdate:
    useEffect(() => {
        // Update the document title using the browser API
        axios.get(`/api/v1/getWorkouts`)
            .then(res => {
                setWorkouts(res.data)
                setUser(props.location.state.name)
            })
    }, []);

    function onClick(id, exercise) {
        console.log(exercise)
        props.history.push({
            pathname: '/exercise',
            state: { id: id, exercise: exercise, name: user, userId: props.location.state.userId },
        });
    }

    return (
        <div className={classes.root}>
            <h1 className={classes.center}>Hey, {user} What are you hitting today?</h1>
            <div className={classes.flexbox} >
                {workouts.length != 0 && workouts.map(item => {
                    return <Button onClick={() => onClick(item.id, item.name)} className={classes.button} key={item.id} variant="contained" color="primary">
                        {item.name}
                    </Button>
                })}
                {workouts.length == 0 &&
                    <div>Loading...</div>
                }
            </div>
        </div>
    );
}