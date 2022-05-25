const express = require('express')
const app = express()
if (process.env.NODE_ENV !== 'production') {
    require('dotenv').config();
    }
    
const port = process.env.PORT || 3000
const patientRouter = require('./routers/patientRouter')
const doctorRouter = require('./routers/doctorRouter')
var cors = require('cors')
const errorHandler = require('./middlewares/error_handler')
app.use(cors())
app.use(express.urlencoded({extended:true}));
app.use(express.json());

app.use('/patient', patientRouter)
app.use('/doctor', doctorRouter)
app.use(errorHandler)

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})