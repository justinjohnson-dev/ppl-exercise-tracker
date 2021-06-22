import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Workout from '../workouts/workouts'
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

export default function Welcome(props) {
    const classes = useStyles();
    const [users, setUsers] = useState([]);

    // Similar to componentDidMount and componentDidUpdate:
    useEffect(() => {
        // Update the document title using the browser API
        axios.get(`/api/v1/getUsers`)
            .then(res => {
                setUsers(res.data)
            })
    }, []);

    function onClick(name, id) {
        props.history.push({
            pathname: '/workouts',
            state: { name: name, userId: id },
        });
    }

    return (
        <div className={classes.root}>
            <h1 className={classes.center}>Welcome Back!</h1>
            <div className={classes.flexbox} >
                {users.length != 0 && users.map(item => {
                    return <Button onClick={() => onClick(item.name, item.id)} className={classes.button} key={item.id} variant="contained" color="primary">
                        {item.name}
                    </Button>
                })}
                {users.length == 0 &&
                    <div>Loading...</div>
                }
            </div>
        </div>
    );
}