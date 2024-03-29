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

global.TextEncoder = require("util").TextEncoder
global.TextDecoder = require("util").TextDecoder

let httpServer
let io
if (!prod) {
  const express = require('express')
  const app = express()
  httpServer = require('http').createServer(app)
  io = require('socket.io')(httpServer, {
    cors: {
      origins: ['http://localhost:*'],
      methods: ['GET', 'POST'],
      credentials: true
    }
  })
} else {
  const options = {
    key: fs.readFileSync('/etc/ssl/private/agilesimulations.co.uk.key'),
    cert: fs.readFileSync('/etc/ssl/certs/agilesimulations.cer')
  }
  httpServer = require('https').createServer(options)
  io = require('socket.io')(httpServer, {
    cors: {
      origins: ['https://agilesimulations.co.uk'],
      methods: ['GET', 'POST'],
      credentials: true
    }
  })
}


const dbStore = require('./store/dbStore.js')

const MongoClient = require('mongodb').MongoClient

const url = prod ?  'mongodb://127.0.0.1:27017/' : 'mongodb://localhost:27017/'
const maxIdleTime = 7200000
const connectDebugOff = prod
const debugOn = !prod

const connections = {}
const maxConnections = 2000

function emit(event, data) {
  if (debugOn) {
    console.log(event, data, '(emit)')
  }
  io.emit(event, data)
}

MongoClient.connect(url, { useUnifiedTopology: true, maxIdleTimeMS: maxIdleTime }, function (err, client) {
  if (err) throw err
  const db = client.db('db')

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

    socket.on('sendCheckDemoOrganisation', () => { dbStore.checkDemoOrganisation(db, io, debugOn) })

    socket.on('sendLoadOrganisations', () => { dbStore.loadOrganisations(db, io, debugOn) })

    socket.on('sendMakeCaptain', (data) => { dbStore.makeCaptain(db, io, data, debugOn) })

    socket.on('sendSetPolicy', (data) => { dbStore.setPolicy(db, io, data, debugOn) })

    socket.on('sendStartGame', (data) => { dbStore.startGame(db, io, data, debugOn) })

    socket.on('sendPullInCard', (data) => { dbStore.pullInCard(db, io, data, debugOn) })

    socket.on('sendTogglePolicyEnforcement', (data) => { dbStore.togglePolicyEnforcement(db, io, data, debugOn) })

    // Set up

    socket.on('sendAddOrganisation', (data) => { dbStore.addOrganisation(db, io, data, debugOn) })

    socket.on('sendUpdateOrganisation', (data) => { dbStore.updateOrganisation(db, io, data, debugOn) })

    socket.on('sendDeleteOrganisation', (data) => { dbStore.deleteOrganisation(db, io, data, debugOn) })

    socket.on('sendAddTeam', (data) => { dbStore.addTeam(db, io, data, debugOn) })

    socket.on('sendUpdateTeam', (data) => { dbStore.updateTeam(db, io, data, debugOn) })

    socket.on('sendDeleteTeam', (data) => { dbStore.deleteTeam(db, io, data, debugOn) })

    socket.on('sendAddPlayer', (data) => { dbStore.addPlayer(db, io, data, debugOn) })

    socket.on('sendUpdatePlayer', (data) => { dbStore.updatePlayer(db, io, data, debugOn) })

    socket.on('sendDeletePlayer', (data) => { dbStore.deletePlayer(db, io, data, debugOn) })
  })
})

const port = process.argv[2] || 3017

httpServer.listen(port, () => {
  console.log('Listening on *:' + port)
})
