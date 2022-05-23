const express = require("express");
const app = express();
const cors = require("cors");
const router = require("./routes");
const errorHandlers = require("./middlewares/error-handlers");

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use("/", router);
app.use(errorHandlers);

module.exports = app;
