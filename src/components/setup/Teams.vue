<template>
  <table class="config-teams">
    <tr>
      <td>
        <h4>Teams</h4>
        <i v-if="showTeams" @click="setShowTeams(false)" title="collapse" class="fas fa-caret-up toggle" />
        <i v-if="!showTeams" @click="setShowTeams(true)" title="expand" class="fas fa-caret-down toggle" />
      </td>
    </tr>
    <tr v-if="showTeams">
      <td colspan="2">
        Organisation:
        <select id="organisation-select" class="organisation-select" @change="loadTeams()">
          <option value="">
            -- Select --
          </option>
          <option v-for="(organisation, index) in organisations" :key="index" :value="organisation.id">
            {{ organisation.name }}
          </option>
        </select>
      </td>
    </tr>
    <tr v-if="showTeams">
      <td>
        <table>
          <tr>
            <td colspan="2">
              New Team <input type="text" class="new-team" id="new-team">
              <button class="btn btn-sm btn-site-primary" @click="addTeam()" :disabled="!editingOrganisationId">
                Add
              </button>
            </td>
          </tr>
          <tr v-for="(team, index) in editingTeams" :key="index">
            <td>
              <i @click="updateTeam(team.id)" :title="'Update ' + team.name + ' Name'" class="fas fa-save" />
              <i @click="deleteTeam(team.id)" :title="'Delete ' + team.name" class="fas fa-trash-alt" />
            </td>
            <td>
              <input type="text" :value="team.name" :id="'team-' + team.id">
            </td>
          </tr>
        </table>
      </td>
    </tr>
  </table>
</template>

<script>
export default {
  props: [
    'socket'
  ],
  data() {
    return {
      showTeams: false
    }
  },
  computed: {
    organisations() {
      return this.$store.getters.getOrganisations
    },
    editingOrganisationId() {
      return this.$store.getters.getEditingOrganisationId
    },
    editingTeams() {
      return this.$store.getters.getEditingTeams
    }
  },
  methods: {
    setShowTeams(val) {
      this.showTeams = val
    },
    loadTeams() {
      const id = document.getElementById('organisation-select').value
      this.$store.dispatch('setEditingOrganisationId', id)
    },
    addTeam() {
      const team = document.getElementById('new-team').value
      if (!team) {
        alert('Please enter a value')
      } else {
        this.socket.emit('addTeam', {organisationId: this.editingOrganisationId, team: team})
        document.getElementById('new-team').value = ''
      }
    },
    updateTeam(id) {
      const team = document.getElementById('team-' + id).value
      if (!team) {
        alert('Please enter a value')
      } else {
        this.socket.emit('updateTeam', {organisationId: this.editingOrganisationId, teamId: id, team: team})
      }
    },
    deleteTeam(id) {
      this.socket.emit('deleteTeam', {organisationId: this.editingOrganisationId, teamId: id})
    }
  }
}
</script>

<style lang="scss">
  .config-teams {

    .new-team {
      width: 200px !important;
    }

    input[type=text] {
      width: 200px;
    }
  }
</style>
