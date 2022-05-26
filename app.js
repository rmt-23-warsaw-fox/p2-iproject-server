if (process.env.NODE_ENV !== `production`) {
  require('dotenv').config()
}

const express = require('express')
const app = express()
const cors = require('cors')
const port = process.env.PORT || 3000
const axios = require('axios')
const routes = require('./routes/index')
app.use(express.urlencoded({extended: true}))
app.use(cors())
app.use(express.json())

app.use(routes)

app.listen(port, () => {
  console.log('listening on port', port);
})