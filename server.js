const express = require('express');
const app = express();
const cors = require('cors');
const mongoose = require('mongoose');
require('dotenv').config();

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

// DB connection
mongoose.connect(process.env.MONGODB_URI, {
    useNewUrlParser: true,
    useCreateIndex: true
}).then(() => console.log('DB Connected'));

// endpoints
app.use('/api/v1', require('./routes/api/crud'));






// use port from environment variables for production
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log(`server running on port ${PORT}`);
})