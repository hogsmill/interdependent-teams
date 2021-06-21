
const { v4: uuidv4 } = require('uuid')

const demo = require('./lib/demo.js')
const orgFuns = require('./lib/organisations.js')
const teamFuns = require('./lib/teams.js')
const playerFuns = require('./lib/players.js')

function _loadOrganisations(db, io) {
  db.collection('interdependentTeams').find().toArray(function(err, res) {
    if (err) throw err
    io.emit('loadOrganisations', res)
  })
}

module.exports = {

  checkDemoOrganisation: function(db, io, debugOn) {

    if (debugOn) { console.log('checkDemoOrganisation') }

    const id = 'f0e9d31b-3f80-4545-bc00-02cc3d492120'
    db.collection('interdependentTeams').findOne({id: id}, function(err, res) {
      if (err) throw err
      if (!res) {
        const organisation = demo.createOrganisation(id)
        db.collection('interdependentTeams').insertOne(organisation, function(err, res) {
          if (err) throw err
          _loadOrganisations(db, io)
        })
      } else {
        _loadOrganisations(db, io)
      }
    })
  },

  loadOrganisations: function(db, io, debugOn) {

    if (debugOn) { console.log('loadOrganisations') }
    _loadOrganisations(db, io)
  },

  makeCaptain: function(db, io, data, debugOn) {

    if (debugOn) { console.log('makeCaptain', data) }

    db.collection('interdependentTeams').findOne({id: data.organisationId}, function(err, res) {
      if (err) throw err
      if (res) {
        const teams = []
        for (let i = 0; i < res.teams.length; i++) {
          const team = res.teams[i]
          const players = []
          for (let j = 0; j < team.players.length; j++) {
            const player = team.players[j]
            if (team.id == data.teamId && player.id == data.player.id) {
              player.captain = true
            } else {
              player.captain = false
            }
            players.push(player)
          }
          team.players = players
          teams.push(team)
        }
        db.collection('interdependentTeams').updateOne({'_id': res._id}, {$set: {teams: teams}}, function(err, res) {
          if (err) throw err
          _loadOrganisations(db, io)
        })
      }
    })
  },

  setPolicy: function(db, io, data, debugOn) {

    if (debugOn) { console.log('setPolicy', data) }

    db.collection('interdependentTeams').findOne({id: data.organisationId}, function(err, res) {
      if (err) throw err
      if (res) {
        const teams = []
        for (let i = 0; i < res.teams.length; i++) {
          const team = res.teams[i]
          team.policy = data.policy
          teams.push(team)
        }
        db.collection('interdependentTeams').updateOne({'_id': res._id}, {$set: {teams: teams}}, function(err, res) {
          if (err) throw err
          _loadOrganisations(db, io)
        })
      }
    })
  },

  startGame: function(db, io, data, debugOn) {

    if (debugOn) { console.log('startGame', data) }

    db.collection('interdependentTeams').findOne({id: data.organisationId}, function(err, res) {
      if (err) throw err
      if (res) {
        const teams = []
        for (let i = 0; i < res.teams.length; i++) {
          const team = res.teams[i]
          const newTeam = teamFuns.newBacklog(team)
          teams.push(newTeam)
        }
        db.collection('interdependentTeams').updateOne({'_id': res._id}, {$set: {teams: teams}}, function(err, res) {
          if (err) throw err
          _loadOrganisations(db, io)
        })
      }
    })
  },

  pullInCard: function(db, io, data, debugOn) {

    if (debugOn) { console.log('pullInCard', data) }

    db.collection('interdependentTeams').findOne({id: data.organisationId}, function(err, res) {
      if (err) throw err
      if (res) {
        const teams = []
        for (let i = 0; i < res.teams.length; i++) {
          let team = res.teams[i]
          if (res.teams[i].id == data.teamId) {
            team = teamFuns.pullInCard(team, data.card)
          }
          teams.push(team)
        }
        db.collection('interdependentTeams').updateOne({'_id': res._id}, {$set: {teams: teams}}, function(err, res) {
          if (err) throw err
          _loadOrganisations(db, io)
        })
      }
    })
  },

  // Setup

  addOrganisation: function(db, io, data, debugOn) {

    if (debugOn) { console.log('addOrganisation', data) }

    const organisation = orgFuns.newOrganisation(data.organisation)
    db.collection('interdependentTeams').insertOne(organisation, function(err, res) {
      if (err) throw err
      if (res) {
        _loadOrganisations(db, io)
      }
    })
  },

  updateOrganisation: function(db, io, data, debugOn) {

    if (debugOn) { console.log('updateOrganisation', data) }

    db.collection('interdependentTeams').findOne({id: data.organisationId}, function(err, res) {
      if (err) throw err
      if (res) {
        res.name = data.name
        const id = res._id
        delete res._id
        db.collection('interdependentTeams').updateOne({'_id': id}, {$set: res}, function(err, res) {
          if (err) throw err
          _loadOrganisations(db, io)
        })
      }
    })
  },

  deleteOrganisation: function(db, io, data, debugOn) {

    if (debugOn) { console.log('deleteOrganisation', data) }

    db.collection('interdependentTeams').deleteOne({id: data.organisationId}, function(err, res) {
      if (err) throw err
      _loadOrganisations(db, io)
    })
  },

  togglePolicyEnforcement: function(db, io, data, debugOn) {

    if (debugOn) { console.log('togglePolicyEnforcement', data) }

    db.collection('interdependentTeams').findOne({id: data.organisationId}, function(err, res) {
      if (err) throw err
      if (res) {
        const hardPolicyEnforcement = !res.hardPolicyEnforcement
        console.log('hardPolicyEnforcement', hardPolicyEnforcement)
        db.collection('interdependentTeams').updateOne({'_id': res._id}, {$set: {hardPolicyEnforcement: hardPolicyEnforcement}}, function(err, res) {
          if (err) throw err
          _loadOrganisations(db, io)
        })
      }
    })
  },

  addTeam: function(db, io, data, debugOn) {

    if (debugOn) { console.log('addTeam', data) }

    db.collection('interdependentTeams').findOne({id: data.organisationId}, function(err, res) {
      if (err) throw err
      if (res) {
        const teams = res.teams ? res.teams : []
        const team = teamFuns.newTeam(data.team)
        teams.push(team)
        db.collection('interdependentTeams').updateOne({id: data.organisationId}, {$set: {teams: teams}}, function(err, res) {
          if (err) throw err
          _loadOrganisations(db, io)
        })
      }
    })
  },

  updateTeam: function(db, io, data, debugOn) {

    if (debugOn) { console.log('updateTeam', data) }

    db.collection('interdependentTeams').findOne({id: data.organisationId}, function(err, res) {
      if (err) throw err
      if (res) {
        const teams = []
        for (let i = 0; i < res.teams.length; i++) {
          const team = res.teams[i]
          if (team.id == data.teamId) {
            team.name = data.team
          }
          teams.push(team)
        }
        db.collection('interdependentTeams').updateOne({id: data.organisationId}, {$set: {teams: teams}}, function(err, res) {
          if (err) throw err
          _loadOrganisations(db, io)
        })
      }
    })
  },

  deleteTeam: function(db, io, data, debugOn) {

    if (debugOn) { console.log('deleteTeam', data) }

    db.collection('interdependentTeams').findOne({id: data.organisationId}, function(err, res) {
      if (err) throw err
      if (res) {
        const teams = []
        for (let i = 0; i < res.teams.length; i++) {
          const team = res.teams[i]
          if (team.id != data.teamId) {
            teams.push(team)
          }
        }
        db.collection('interdependentTeams').updateOne({id: data.organisationId}, {$set: {teams: teams}}, function(err, res) {
          if (err) throw err
          _loadOrganisations(db, io)
        })
      }
    })
  },

  addPlayer: function(db, io, data, debugOn) {

    if (debugOn) { console.log('addPlayer', data) }

    db.collection('interdependentTeams').findOne({id: data.organisationId}, function(err, res) {
      if (err) throw err
      if (res) {
        const teams = []
        for (let i = 0; i < res.teams.length; i++) {
          const team = res.teams[i]
          if (team.id == data.teamId) {
            const player = playerFuns.newPlayer(data.player)
            team.players.push(player)
          }
          teams.push(team)
        }
        db.collection('interdependentTeams').updateOne({id: data.organisationId}, {$set: {teams: teams}}, function(err, res) {
          if (err) throw err
          _loadOrganisations(db, io)
        })
      }
    })
  },

  updatePlayer: function(db, io, data, debugOn) {

    if (debugOn) { console.log('updatePlayer', data) }

    db.collection('interdependentTeams').findOne({id: data.organisationId}, function(err, res) {
      if (err) throw err
      if (res) {
        const teams = []
        for (let i = 0; i < res.teams.length; i++) {
          const team = res.teams[i]
          if (team.id == data.teamId) {
            const players = []
            for (let j = 0; j < team.players.length; j++) {
              const player = team.players[j]
              if (player.id == data.playerId) {
                player.name = data.player
              }
              players.push(player)
            }
            team.players = players
          }
          teams.push(team)
        }
        db.collection('interdependentTeams').updateOne({id: data.organisationId}, {$set: {teams: teams}}, function(err, res) {
          if (err) throw err
          _loadOrganisations(db, io)
        })
      }
    })
  },

  deletePlayer: function(db, io, data, debugOn) {

    if (debugOn) { console.log('deletePlayer', data) }

    db.collection('interdependentTeams').findOne({id: data.organisationId}, function(err, res) {
      if (err) throw err
      if (res) {
        const teams = []
        for (let i = 0; i < res.teams.length; i++) {
          const team = res.teams[i]
          if (team.id == data.teamId) {
            const players = []
            for (let j = 0; j < team.players.length; j++) {
              const player = team.players[j]
              if (player.id != data.playerId) {
                players.push(player)
              }
            }
            team.players = players
          }
          teams.push(team)
        }
        db.collection('interdependentTeams').updateOne({id: data.organisationId}, {$set: {teams: teams}}, function(err, res) {
          if (err) throw err
          _loadOrganisations(db, io)
        })
      }
    })
  }

}
