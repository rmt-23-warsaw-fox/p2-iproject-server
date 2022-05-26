const express = require('express')
const cors = require('cors');
const app = express()
const port = process.env.PORT || 3000
const routes = require("./routers");
const errorHandlers = require('./middlewares/errorHandlers');

app.use(cors())
app.use(express.urlencoded({ extended: false }))
app.use(express.json())

app.use(routes)
app.use(errorHandlers);

app.listen(port, () => {
  console.log(`App listening on port ${port}`)
})