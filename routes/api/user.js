const express = require("express");
const router = express.Router();

// user model
const User = require("../../models/user");

router.post("/createUser", (req, res) => {
    let userInfoObject = new User(req.body);
    console.log("userInfoObject");
    console.log(userInfoObject);

    // id and name constraints 
    // will not write to db unless they are both unique
    userInfoObject.save()
        .then(item => {
            res.send("item saved to database");
        })
        .catch(err => {
            res.status(400).send("unable to save to database");
        });
});


router.get("/getUsers", (req, res) => {
    User.find({}).then(user => {
        console.log(user);
        res.send(user);
    });
});


module.exports = router;