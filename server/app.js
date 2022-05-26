const express = require('express')
const app = express()
const PORT = process.env.PORT || 3001
const cors = require('cors')
const router = require('./routes')
const errorHandler = require('./middlewares/error-handler')

app.use(cors())
app.use(express.urlencoded({extended:true}))
app.use(express.json())
app.use('/', router)

app.use(errorHandler)

app.listen(PORT, ()=>console.log('http://localhost:' + PORT))