'use strict'

require('dotenv').config()
const cors = require('cors')
const express = require('express')
const router = require('./routers/index')
const errorHandler = require('./midleware/errorHandler')
const app = express()
const port = process.env.PORT || 3000

app.use(cors())
app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.use('/', router)
app.use(errorHandler)

app.get('/', (req, res) => {
  res.send('Hello Brooooo')
})

app.listen(port, () => {
  console.log(`Example app listening on http://localhost:${port}`)
})