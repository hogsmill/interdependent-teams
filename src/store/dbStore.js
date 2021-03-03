
const { v4: uuidv4 } = require('uuid')

function _loadOrganisations(db, io) {
  db.collection('interdependentTeamsOrganisations').find().toArray(function(err, res) {
    if (err) throw err
    io.emit('loadOrganisations', res)
  })
}

module.exports = {

  loadOrganisations: function(db, io, debugOn) {

    if (debugOn) { console.log('loadOrganisations') }
    _loadOrganisations(db, io)
  },

  addOrganisation: function(db, io, data, debugOn) {

    if (debugOn) { console.log('addOrganisation', data) }

    db.collection('interdependentTeamsOrganisations').insertOne({name: data.organisation, id: uuidv4()}, function(err, res) {
      if (err) throw err
      if (res) {
        _loadOrganisations(db, io)
      }
    })
  },

  updateOrganisation: function(db, io, data, debugOn) {

    if (debugOn) { console.log('updateOrganisation', data) }

    db.collection('interdependentTeamsOrganisations').findOne({id: data.organisationId}, function(err, res) {
      if (err) throw err
      if (res) {
        res.name = data.name
        const id = res._id
        delete res._id
        db.collection('interdependentTeamsOrganisations').updateOne({'_id': id}, {$set: res}, function(err, res) {
          if (err) throw err
          _loadOrganisations(db, io)
        })
      }
    })
  },

  deleteOrganisation: function(db, io, data, debugOn) {

    if (debugOn) { console.log('deleteOrganisation', data) }

    db.collection('interdependentTeamsOrganisations').deleteOne({id: data.organisationId}, function(err, res) {
      if (err) throw err
      _loadOrganisations(db, io)
    })
  },

  addTeam: function(db, io, data, debugOn) {

    if (debugOn) { console.log('addTeam', data) }

    db.collection('interdependentTeamsOrganisations').findOne({id: data.organisationId}, function(err, res) {
      if (err) throw err
      if (res) {
        const teams = res.teams ? res.teams : []
        teams.push({
          id: uuidv4(),
          name: data.team
        })
        db.collection('interdependentTeamsOrganisations').updateOne({id: data.organisationId}, {$set: {teams: teams}}, function(err, res) {
          if (err) throw err
          _loadOrganisations(db, io)
        })
      }
    })
  },

  updateTeam: function(db, io, data, debugOn) {

    if (debugOn) { console.log('updateTeam', data) }

    db.collection('interdependentTeamsOrganisations').findOne({id: data.organisationId}, function(err, res) {
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
        db.collection('interdependentTeamsOrganisations').updateOne({id: data.organisationId}, {$set: {teams: teams}}, function(err, res) {
          if (err) throw err
          _loadOrganisations(db, io)
        })
      }
    })
  },

  deleteTeam: function(db, io, data, debugOn) {

    if (debugOn) { console.log('deleteTeam', data) }

    db.collection('interdependentTeamsOrganisations').findOne({id: data.organisationId}, function(err, res) {
      if (err) throw err
      if (res) {
        const teams = []
        for (let i = 0; i < res.teams.length; i++) {
          const team = res.teams[i]
          if (team.id != data.teamId) {
            teams.push(team)
          }
        }
        db.collection('interdependentTeamsOrganisations').updateOne({id: data.organisationId}, {$set: {teams: teams}}, function(err, res) {
          if (err) throw err
          _loadOrganisations(db, io)
        })
      }
    })
  },
}
