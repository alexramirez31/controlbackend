const express = require('express');
const app = express();
const BodyParser = require('body-parser');
const cors = require('cors');
const bodyParser = require('body-parser');

app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

app.use(cors());

//ROUTES

const userRoute = require('./api/routes/user');
app.use('/user',userRoute);


module.exports = app;