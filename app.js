"use strict"
if (process.env.NODE_ENV !== "production") {
  require("dotenv").config()
}
const express = require("express")
const app = express()
const cors = require("cors")
const port = process.env.PORT || 3000
const routes = require("./routes/index")
const errorHandler = require("./middlewares/errorHandler")

app.use(cors())
app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.use(routes)

app.use(errorHandler)
app.listen(port, () => console.log("listening on port:", port))
