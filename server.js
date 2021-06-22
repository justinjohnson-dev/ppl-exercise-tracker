const express = require('express');
const app = express();
const cors = require('cors');
const bodyParser = require("body-parser");
const mongoose = require('mongoose');

// exclusing dotenv config from production
if (process.env.NODE_ENV !== 'production') require('dotenv').config()

// handles cores issues from different domains
app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});

// CORS Middleware
app.use(cors());
//Here we are configuring express to use body-parser as middle-ware.
app.use(bodyParser.json());

// DB connection
mongoose.connect(process.env.MONGODB_URI, {
    useNewUrlParser: true,
    useCreateIndex: true
}).then(() => console.log('DB Connected'));

// endpoints
app.use('/api/v1', require('./routes/api/workout'));
app.use('/api/v1', require('./routes/api/exercise'));
app.use('/api/v1', require('./routes/api/user'));

// create static assets from react code for production only
if (process.env.NODE_ENV === 'production') {
    app.use(express.static('client/build'));

    app.get('*', (req, res) => {
        res.sendFile(path.join(__dirname, 'client', 'build', 'index.html'));
    });
}

// use port from environment variables for production
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log(`server running on port ${PORT}`);
})
