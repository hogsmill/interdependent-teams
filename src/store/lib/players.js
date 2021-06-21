
const { v4: uuidv4 } = require('uuid')

module.exports = {

  newPlayer: function(name) {
    return {
      id: uuidv4(),
      name: name,
      captain: false,
      effort: {
        available: 3,
        assigned: 0
      }
    }
  }

}
