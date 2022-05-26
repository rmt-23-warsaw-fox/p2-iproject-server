const express = require('express');
const cors = require('cors');
const app = express();

app.use(cors());
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

app.use('/', require("./routers/index"));

app.use((err, req, res, next) => {
    console.log(err);
    let code = 500;
    let message = "Internal Server Error";

    if (err.name === "SequelizeValidationError" || err.name === "SequelizeUniqueConstraintError") {
        code = 400;
        message = err.errors[0].message;
    }

    if (err.message === "user not found") {
        code = 401;
        message = "Invalid username or password"
    }
    
    res.status(code).json({message})
})

module.exports = app;