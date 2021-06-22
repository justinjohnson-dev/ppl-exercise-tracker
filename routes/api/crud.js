const express = require("express");
const router = express.Router();
const mongoose = require('mongoose');


// create
router.post('/post', (req, res) => {
    res.json({
        message: "POST API"
    })
})

// read
router.get('/get', (req, res) => {
    res.json({
        message: "Test GET"
    })
})

// update
router.put('/put/:id', (req, res) => {
    res.json({
        message: `PUT ${req.params.id} API for MERN Boilerplate`
    })
})

// delete
router.delete('/delete/:id', (req, res) => {
    res.json({
        message: `DELETE ${req.params.id} API for MERN Boilerplate`
    })
})

module.exports = router;