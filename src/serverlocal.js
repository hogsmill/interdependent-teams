const fs = require('fs')
const ON_DEATH = require('death')({uncaughtException: true})
const os = require('os')

const prod = os.hostname() == 'agilesimulations' ? true : false
const logFile = prod ? process.argv[4] : 'server.log'

ON_DEATH(function(signal, err) {
  let logStr = new Date()
  if (signal) {
    logStr = logStr + ' ' + signal + '\n'
  }
  if (err && err.stack) {
    logStr = logStr + '  ' + err.stack + '\n'
  }
  fs.appendFile(logFile, logStr, function (err) {
    if (err) console.log(logStr)
    process.exit()
  })
})

const express = require('express')
const app = express()
const http = require('http').createServer(app)
const io = require('socket.io')(http, {
  cors: {
    origins: ['http://localhost:*', 'http://agilesimulations.co.uk'],
    methods: ['GET', 'POST'],
    credentials: true
  }
})

const connectDebugOff = prod
const debugOn = !prod

const connections = {}
const maxConnections = 500

function emit(event, data) {
  if (debugOn) {
    console.log(event, data, '(emit)')
  }
  io.emit(event, data)
}

io.on('connection', (socket) => {
  const connection = socket.handshake.headers.host
  connections[connection] = connections[connection] ? connections[connection] + 1 : 1
  if (Object.keys(connections).length > maxConnections || connections[connection] > maxConnections) {
    console.log(`Too many connections. Socket ${socket.id} closed`)
    socket.disconnect(0)
  } else {
    connectDebugOff || console.log(`A user connected with socket id ${socket.id} from ${connection} - ${connections[connection]} connections. (${Object.keys(connections).length} clients)`)
    emit('updateConnections', {connections: connections, maxConnections: maxConnections})
  }

  socket.on('disconnect', () => {
    const connection = socket.handshake.headers.host
    connections[connection] = connections[connection] - 1
    connectDebugOff || console.log(`User with socket id ${socket.id} has disconnected.`)
    emit('updateConnections', {connections: connections, maxConnections: maxConnections})
  })

  socket.on('testMessage', (data) => { emit('testMessage', data) })

})

const port = process.argv[2] || 3016

http.listen(port, () => {
  console.log('Listening on *:' + port)
})
