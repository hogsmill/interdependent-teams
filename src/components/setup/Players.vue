<template>
  <table class="config-players">
    <tr>
      <td>
        <h4>Players</h4>
        <i v-if="showPlayers" @click="setshowPlayers(false)" title="collapse" class="fas fa-caret-up toggle" />
        <i v-if="!showPlayers" @click="setshowPlayers(true)" title="expand" class="fas fa-caret-down toggle" />
      </td>
    </tr>
    <tr v-if="showPlayers">
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
    <tr v-if="showPlayers">
      <td colspan="2">
        Team: 
        <select id="team-select" class="team-select" @change="loadPlayers()">
          <option value="">
            -- Select --
          </option>
          <option v-for="(team, index) in editingTeams" :key="index" :value="team.id">
            {{ team.name }}
          </option>
        </select>
      </td>
    </tr>
    <tr v-if="showPlayers">
      <td>
        <table>
          <tr>
            <td colspan="2">
              New player <input type="text" class="new-player" id="new-player">
              <button class="btn btn-sm btn-site-primary" @click="addPlayer()" :disabled="!editingOrganisationId">
                Add
              </button>
            </td>
          </tr>
          <tr v-for="(player, index) in editingPlayers" :key="index">
            <td>
              <i @click="updatePlayer(player.id)" :title="'Update ' + player.name + ' Name'" class="fas fa-save" />
              <i @click="deletePlayer(player.id)" :title="'Delete ' + player.name" class="fas fa-trash-alt" />
            </td>
            <td>
              <input type="text" :value="player.name" :id="'player-' + player.id">
            </td>
          </tr>
        </table>
      </td>
    </tr>
  </table>
</template>

<script>
import bus from '../../socket.js'

export default {
  data() {
    return {
      showPlayers: false
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
    },
    editingTeamId() {
      return this.$store.getters.getEditingTeamId
    },
    editingPlayers() {
      return this.$store.getters.getEditingPlayers
    }
  },
  methods: {
    setshowPlayers(val) {
      this.showPlayers = val
    },
    loadTeams() {
      const id = document.getElementById('organisation-select').value
      this.$store.dispatch('setEditingOrganisationId', id)
    },
    loadPlayers() {
      const id = document.getElementById('team-select').value
      this.$store.dispatch('setEditingTeamId', id)
    },
    addPlayer() {
      const player = document.getElementById('new-player').value
      if (!player) {
        alert('Please enter a value')
      } else {
        bus.$emit('sendAddPlayer', {organisationId: this.editingOrganisationId, teamId: this.editingTeamId, player: player})
        document.getElementById('new-player').value = ''
      }
    },
    updatePlayer(id) {
      const player = document.getElementById('player-' + id).value
      if (!player) {
        alert('Please enter a value')
      } else {
        bus.$emit('sendUpdatePlayer', {organisationId: this.editingOrganisationId, teamId: this.editingTeamId, playerId: id, player: player})
      }
    },
    deletePlayer(id) {
      bus.$emit('sendDeletePlayer', {organisationId: this.editingOrganisationId, teamId: this.editingTeamId, playerId: id})
    }
  }
}
</script>

<style lang="scss">
  .config-players {

    .new-player {
      width: 200px !important;
    }

    input[type=text] {
      width: 200px;
    }
  }
</style>
