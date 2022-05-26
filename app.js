"use strict";

const express = require("express");
const routes = require("./routes/index");
const app = express();
const cors = require("cors");
const { errorHandler } = require("./middlewares/errorHandler");
if (process.env.NODE_ENV !== "production") {
  require("dotenv").config();
}

app.use(cors());
const port = process.env.PORT || 3000;
app.use(
  express.urlencoded({
    extended: false,
  })
);
app.use(express.json());

app.use("/", routes);
app.use(errorHandler);

app.listen(port, () => {
  console.log(`Example app listening on http://localhost:${port}`);
});

// module.exports = app;
