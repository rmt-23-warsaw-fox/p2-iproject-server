const express = require('express')
const app = express()
const http = require('http')
const server = http.createServer(app)
const {Server} = require('socket.io')
const io = new Server(server)

const port = 3000

app.get('/', (request, response) => {
  response.sendFile(__dirname + '/index.html')
})

io.on('connection', (socket) => {
  console.log('a user connected');
  socket.on('disconnect', () => {
    console.log('user disconnect');
  })
})

server.listen(port, () => {
  console.log('Listening on port :', port);
})