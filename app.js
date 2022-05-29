"use strict";
if(process.env.NODE_ENV !== 'production'){
    require("dotenv").config()
}
const express = require('express')
const app = express()
const errorHandle = require('./middleware/handleError')
const cors = require('cors')
const news = require('./route/newsroute')
const port = process.env.PORT || 3000

app.use(express.urlencoded({extended: true}))
app.use(express.json())
app.use(cors())

app.use(news)
app.use(errorHandle)

app.listen(port, () => {
    console.log(`Running on port ${port}`)
})