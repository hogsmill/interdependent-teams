
const { v4: uuidv4 } = require('uuid')

const columns = require('./columns.js')
const policies = require('./policies.js')

function newCard(n, name) {
  return {
    number: n,
    name: name
  }
}

module.exports = {

  newTeam: function(name) {
    return {
      id: uuidv4(),
      name: name,
      policy: '',
      policies: policies.policies,
      columns: columns.columns(),
      players: []
    }
  },

  newBacklog: function(team) {
    const cols = columns.columns()
    for (let n = 1; n <= 10; n++) {
      const card = newCard(n, team.name)
      cols[0].cards.push(card)
    }
    team.columns = cols
    return team
  },

  pullInCard: function(team, card) {
    const columns = team.columns
    if (columns[0].cards[0].number == card.number) {
      const c = columns[0].cards.shift()
      columns[1].cards.push(c)
    }
    console.log(columns)
    team.columns = columns
    return team
  }

}
