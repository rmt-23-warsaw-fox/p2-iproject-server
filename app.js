if (process.env.NODE_ENV !== "production"){
  require("dotenv").config()
}

const express = require('express')
const cors = require('cors')
const app = express()
const port = process.env.PORT || 3000
const index = require('./routes/indexRoute')
const errorHandler = require('./middlewares/errorHandler.js')

app.use(cors())
app.use(express.urlencoded({extended: false}))
app.use(express.json())

app.use('/', index)
app.use(errorHandler)

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})