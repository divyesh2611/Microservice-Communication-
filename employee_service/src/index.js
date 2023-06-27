const express = require('express');
const app = express();
const router = require('./rest-service');
require('dotenv').config();

const bodyparser = require('body-parser')


app.use(express.json());
app.use(bodyparser.urlencoded({ extended: true }));
app.use('/', router);
const PORT = 3003;
app.listen(PORT, () => {
    console.log(`server is listen on port no ${PORT}`);
})