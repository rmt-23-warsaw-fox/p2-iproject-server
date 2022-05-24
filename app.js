const express = require('express');
const cors = require('cors');
const app = express();

//middlewares
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({extended: false}));

//error handlers
app.use((err, req, res, next) => {
    let code = 500;
    let message = " Internal Server Error"

    res.status(code).json({message: message});
})

module.exports = app;