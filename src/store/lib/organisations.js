
const { v4: uuidv4 } = require('uuid')

module.exports = {

  newOrganisation: function(name, id) {
    return {
      id: id ? id : uuidv4(),
      name: name,
      hardPolicyEnforcement: false,
      teams: []
    }
  }

}
