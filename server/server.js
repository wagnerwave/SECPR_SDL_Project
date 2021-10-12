// Require Variable
const express = require('express');
const assert = require('assert')
const bodyParser = require('body-parser');
const cors = require('cors');
const mongo = require('mongodb');
const connectDB = require('./config/db')

const app = express();

// Connection to Database
connectDB();

app.use(bodyParser.json());
app.use(express.json());
app.use(cors());

app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});

app.use('/', require('./routes/api/route'));

// Port listening
const hostname = '0.0.0.0';
const port = 3000;

app.listen(port, () => {
    console.log(`Server running at listening at http://${hostname}:${port}`);
});