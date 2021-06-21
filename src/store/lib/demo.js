
const orgFuns = require('./organisations.js')
const teamFuns = require('./teams.js')
const playerFuns = require('./players.js')

const teams = [
  'Pheonix',
  'Dragon',
  'Centaur',
  'Gryphon'
]

const players = [
  'Steve',
  'Dolly',
  'Allan',
  'Helen'
]

module.exports = {

  createOrganisation: function(id) {
    const organisation = orgFuns.newOrganisation('Demo', id)
    for (let i = 0; i < teams.length; i++) {
      const team = teamFuns.newTeam(teams[i])
      for (let j = 0; j < players.length; j++) {
        const player = playerFuns.newPlayer(players[j] + ' ' + teams[i])
        console.log(player)
        team.players.push(player)
      }
      organisation.teams.push(team)
    }
    return organisation
  }

}
