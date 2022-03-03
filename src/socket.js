import io from 'socket.io-client'
import bus from './EventBus'

let connStr
if (location.hostname == 'localhost') {
  connStr = 'http://localhost:3017'
} else {
  connStr = 'https://agilesimulations.co.uk:3017'
}
console.log('Connecting to: ' + connStr)
const socket = io(connStr)

// --- Send ---

bus.on('sendCheckDemoOrganisation', (data) => { socket.emit('sendCheckDemoOrganisation', data) })

bus.on('sendLoadOrganisations', (data) => { socket.emit('sendLoadOrganisations', data) })

bus.on('sendMakeCaptain', (data) => { socket.emit('sendMakeCaptain', data) })

bus.on('sendSetPolicy', (data) => { socket.emit('sendSetPolicy', data) })

bus.on('sendStartGame', (data) => { socket.emit('sendStartGame', data) })

bus.on('sendPullInCard', (data) => { socket.emit('sendPullInCard', data) })

// Facilitator

bus.on('sendAddOrganisation', (data) => { socket.emit('sendAddOrganisation', data) })

bus.on('sendUpdateOrganisation', (data) => { socket.emit('sendUpdateOrganisation', data) })

bus.on('sendDeleteOrganisation', (data) => { socket.emit('sendDeleteOrganisation', data) })

bus.on('sendTogglePolicyEnforcement', (data) => { socket.emit('sendTogglePolicyEnforcement', data) })

bus.on('sendAddTeam', (data) => { socket.emit('sendAddTeam', data) })

bus.on('sendUpdateTeam', (data) => { socket.emit('sendUpdateTeam', data) })

bus.on('sendDeleteTeam', (data) => { socket.emit('sendDeleteTeam', data) })

bus.on('sendAddPlayer', (data) => { socket.emit('sendAddPlayer', data) })

bus.on('sendUpdatePlayer', (data) => { socket.emit('sendUpdatePlayer', data) })

bus.on('sendDeletePlayer', (data) => { socket.emit('sendDeletePlayer', data) })

// --- Receive ---

socket.on('loadOrganisations', (data) => { bus.emit('loadOrganisations', data) })

export default bus
