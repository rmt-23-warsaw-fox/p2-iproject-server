// if (process.env.NODE_ENV !== 'production') {
//     require("dotenv").config()
// };
require("dotenv").config()
const express = require('express');
const app = express();
const port = process.env.PORT || 3000
const router = require('./routes');
const errorsHandler = require('./middlewares/errorsHandler')
const cors = require('cors')

app.use(cors())
app.use(express.urlencoded({ extended: false }))
app.use(express.json())

app.use('/', router)
app.use(errorsHandler)

app.listen(port, () => {
    console.log(`This app is running on port ${port}`)
})

module.exports = app