"use strict";
if (process.env.NODE_ENV !== "production") {
    require("dotenv").config();
}
const express = require("express");
const cors = require("cors");
const app = express();
const port = process.env.PORT || 3000;
const router = require("./routes/index");

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/", router);

app.listen(port, () => console.log(`This app is listening on ${+port}`));
