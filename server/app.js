const express = require('express')
const cors = require('cors')
const app = express()

const port = 3000

app.use(express.urlencoded({extended:false}));
app.use(cors())

app.get('/', (request, response) => {
  response.send('hallo')
})

app.post('/login')

server.listen(port, () => {
  console.log('Listening on port :', port);
})