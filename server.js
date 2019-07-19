// Import env file
require('dotenv').config();

const express = require('express');
const app = express();
const { startTimer } = require('./index');
const { keepAwake } = require('./src/util/heroku_util');
app.get('/', (req, res) => {
    res.send('Timer Service is running. No worries man');
});

app.listen(process.env.PORT || 4000, () => {
    console.log('Server is runnning in port: ', process.env.PORT);
    startTimer();
    keepAwake();
});